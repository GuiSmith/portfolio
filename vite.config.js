import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base:
    process.env.GITHUB_PAGES === "true" && process.env.REPO_NAME
      ? `/${process.env.REPO_NAME}/`
      : "/",
  plugins: [react()],
});
