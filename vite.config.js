import { defineConfig, loadEnv } from "vite"
import solidPlugin from "vite-plugin-solid"
import eslint from "vite-plugin-eslint"

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") }

  return defineConfig({
    plugins: [solidPlugin(), eslint()],
    build: {
      target: "esnext",
      polyfillDynamicImport: false
    },
    server: {
      port: process.env.PORT
    }
  })
}
