import fs from "fs";
import path from "path";
import { PROJECT_ROOT } from "../config.js";

export function resolveSafePath(relativePath: string): string {
  const resolved = path.resolve(PROJECT_ROOT, relativePath);
  if (!resolved.startsWith(PROJECT_ROOT)) {
    throw new Error("Access outside project root is not allowed");
  }
  return resolved;
}

export function isFile(pathname: string): boolean {
  return fs.existsSync(pathname) && fs.statSync(pathname).isFile();
}
