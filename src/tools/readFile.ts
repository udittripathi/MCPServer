import fs from "fs";
import { resolveSafePath, isFile } from "../utils/fileUtils.js";

export function readFile(relativePath: string) {
  const fullPath = resolveSafePath(relativePath);

  if (!isFile(fullPath)) {
    throw new Error("File does not exist");
  }

  return fs.readFileSync(fullPath, "utf-8");
}
