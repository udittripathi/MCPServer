import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { listFiles } from "./tools/listFiles.js";
import { readFile } from "./tools/readFile.js";
import { searchCode } from "./tools/searchCode.js";
import { findFunction } from "./tools/findFunction.js";

const server = new McpServer({
  name: "calcom-local-code-server",
  version: "1.0.0"
});

/* ---------------- TOOLS ---------------- */

server.registerTool(
  "list_files",
  {
    description: "List all files in the cal.com project"
  },
  async () => ({
    content: [{
      type: "text",
      text: JSON.stringify(await listFiles(), null, 2)
    }]
  })
);

server.registerTool(
  "read_file",
  {
    description: "Read a file from the project",
    inputSchema: {
      path: z.string().describe("Relative path from project root")
    }
  },
  async ({ path }) => ({
    content: [{ type: "text", text: readFile(path) }]
  })
);

server.registerTool(
  "search_code",
  {
    description: "Search text in project source code",
    inputSchema: {
      query: z.string().describe("Text to search for")
    }
  },
  async ({ query }) => ({
    content: [{
      type: "text",
      text: JSON.stringify(await searchCode(query), null, 2)
    }]
  })
);

server.registerTool(
  "find_function",
  {
    description: "Find function definition in project",
    inputSchema: {
      name: z.string().describe("Function name")
    }
  },
  async ({ name }) => ({
    content: [{
      type: "text",
      text: JSON.stringify(await findFunction(name), null, 2)
    }]
  })
);

/* ---------------- START ---------------- */

const transport = new StdioServerTransport();
await server.connect(transport);
