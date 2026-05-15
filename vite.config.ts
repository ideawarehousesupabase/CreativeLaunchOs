import { defineConfig, loadEnv, mergeConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

// ---------------------------------------------------------------------------
// Dev-only SSR error logger plugin (surfaces SSR errors to the browser via HMR)
// ---------------------------------------------------------------------------
const SSR_CAPTURE_KEY = "__TANSTACK_CAPTURE_SSR_ERROR__";

function devSsrErrorLogger() {
  let lastCapture: { error: unknown; at: number } | undefined;
  const CAPTURE_TTL_MS = 5_000;

  const capture = (error: unknown) => {
    lastCapture = { error, at: Date.now() };
  };

  const consumeCapture = () => {
    if (!lastCapture) return undefined;
    if (Date.now() - lastCapture.at > CAPTURE_TTL_MS) {
      lastCapture = undefined;
      return undefined;
    }
    const { error } = lastCapture;
    lastCapture = undefined;
    return error;
  };

  return {
    name: "dev-ssr-error-logger",
    apply: "serve" as const,
    configureServer(server: any) {
      (globalThis as any)[SSR_CAPTURE_KEY] = capture;
      const g = globalThis as any;
      if (typeof g.addEventListener === "function") {
        g.addEventListener("error", (e: any) => capture(e.error ?? e));
        g.addEventListener("unhandledrejection", (e: any) => capture(e.reason));
      }
      const onUnhandledRejection = (reason: unknown) => capture(reason);
      process.on("unhandledRejection", onUnhandledRejection);
      server.httpServer?.once("close", () => {
        process.off("unhandledRejection", onUnhandledRejection);
      });
      server.middlewares.use((_req: any, res: any, next: any) => {
        const origEnd = res.end.bind(res);
        res.end = (...args: any[]) => {
          if (res.statusCode >= 500) {
            const captured = consumeCapture();
            let err: Error | null;
            if (captured instanceof Error) {
              err = captured;
            } else if (typeof captured === "string" && captured.length > 0) {
              err = new Error(captured);
            } else {
              err = null;
            }
            try {
              server.ws.send({
                type: "custom",
                event: "server-ssr-error",
                data: err
                  ? { name: err.name, message: err.message, stack: err.stack }
                  : { name: "Error", message: "SSR rendering failed" },
              });
            } catch {
              // ignore
            }
          }
          return origEnd(...args);
        };
        next();
      });
    },
    transform(code: string, id: string) {
      const normalizedId = id.replace(/\\/g, "/");
      const isTargetModule =
        normalizedId.includes(
          "/@tanstack/start-server-core/src/request-response.ts",
        ) ||
        normalizedId.includes(
          "/@tanstack/start-server-core/dist/esm/request-response.js",
        );
      if (!isTargetModule) return null;
      const needle = "handler(request, requestOpts)";
      if (!code.includes(needle)) return null;
      return code.replace(
        needle,
        `Promise.resolve(${needle}).catch((err) => { globalThis.${SSR_CAPTURE_KEY}?.(err); throw err; })`,
      );
    },
  };
}

// ---------------------------------------------------------------------------
// Dev-only server-function error logger plugin
// ---------------------------------------------------------------------------
function devServerFnErrorLogger() {
  const HMR_SEND_KEY = "__TANSTACK_SERVER_FN_HMR_SEND__";
  return {
    name: "dev-server-fn-error-logger",
    apply: "serve" as const,
    enforce: "pre" as const,
    configureServer(server: any) {
      (globalThis as any)[HMR_SEND_KEY] = (data: any) => {
        server.ws.send({ type: "custom", event: "server-fn-error", data });
      };
    },
    transform(code: string, id: string) {
      const normalizedId = id.replace(/\\/g, "/");
      const isTargetModule =
        normalizedId.includes(
          "/@tanstack/start-server-core/src/server-functions-handler.ts",
        ) ||
        normalizedId.includes(
          "/@tanstack/start-server-core/dist/esm/server-functions-handler.js",
        );
      if (!isTargetModule) return null;
      const needle = "const unwrapped = res.result || res.error";
      if (!code.includes(needle)) return null;
      return code.replace(
        needle,
        `${needle}

      if (res?.error) {
        const err = res.error
        const payload = {
          source: 'tanstack',
          type: 'server-fn-error',
          method: request.method,
          url: request.url,
          name: err?.name ?? 'Error',
          message: err?.message ?? String(err),
          stack: typeof err?.stack === 'string' ? err.stack : undefined,
        }
        globalThis.${HMR_SEND_KEY}?.(payload)
      }`,
      );
    },
  };
}

// ---------------------------------------------------------------------------
// Main config
// ---------------------------------------------------------------------------
export default defineConfig(async ({ command, mode }) => {
  // Inject VITE_* env vars as define constants
  const loadedEnv = loadEnv(mode, process.cwd(), "VITE_");
  const envDefine: Record<string, string> = {};
  for (const [key, value] of Object.entries(loadedEnv)) {
    envDefine[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  const plugins: any[] = [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    devServerFnErrorLogger(),
    devSsrErrorLogger(),
    tanstackStart({
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
    react(),
  ];

  // Add Cloudflare plugin for production builds
  if (command === "build") {
    try {
      const { cloudflare } = await import("@cloudflare/vite-plugin");
      plugins.push(cloudflare({ viteEnvironment: { name: "ssr" } }));
    } catch {
      // @cloudflare/vite-plugin is optional
    }
  }

  const config = {
    define: envDefine,
    resolve: {
      alias: {
        "@": `${process.cwd()}/src`,
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    server: {
      host: "::",
      port: 8080,
      watch: {
        awaitWriteFinish: {
          stabilityThreshold: 1000,
          pollInterval: 100,
        },
      },
    },
    plugins,
  };

  return config;
});
