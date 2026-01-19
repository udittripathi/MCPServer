import fg from "fast-glob";
import fs from "fs";
import path from "path";
import { PROJECT_ROOT } from "../config.js";

export async function searchCode(query: string) {
  const files = await fg("**/*.{ts,tsx,js,jsx}", {
    cwd: PROJECT_ROOT,
    ignore: ["node_modules/**", ".git/**"]
  });

  const results: any[] = [];

  for (const file of files) {
    const fullPath = path.join(PROJECT_ROOT, file);
    const content = fs.readFileSync(fullPath, "utf-8");

    if (content.includes(query)) {
      const lines = content.split("\n");
      lines.forEach((line, index) => {
        if (line.includes(query)) {
          results.push({
            file,
            line: index + 1,
            code: line.trim()
          });
        }
      });
    }
  }

  return results.slice(0, 50);
}
