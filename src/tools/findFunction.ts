import { searchCode } from "./searchCode.js";

export async function findFunction(functionName: string) {
  return searchCode(`function ${functionName}`)
    .then(res => res.length ? res : searchCode(`${functionName}(`));
}
