import fg from "fast-glob";
import { PROJECT_ROOT } from "../config.js";

export async function listFiles() {
  const files = await fg("**/*", {
    cwd: PROJECT_ROOT,
    ignore: ["node_modules/**", ".git/**"],
    onlyFiles: true
  });

  return files;
}
