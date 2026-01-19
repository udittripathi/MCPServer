# Local Code MCP Server (TypeScript)

A **Model Context Protocol (MCP) server** that provides LLMs with **safe, read-only access to a local codebase**.  
It allows AI assistants to answer questions like:

- Where is this functionality implemented?
- Which file contains this function?
- Search for usages of a specific API or keyword

All source code remains **local** — nothing is uploaded or shared externally.

---

## ✨ Features

- 🔒 Local-only, read-only access to files
- 📂 List files in a project
- 📄 Read file contents safely
- 🔍 Search code across the repository
- 🧭 Find function definitions
- 🧠 Zod-based schemas for reliable tool calls
- 🔌 Compatible with any MCP-enabled LLM client

---

## 🏗 Architecture

```
LLM Client (Claude / Cursor / Custom UI)
            │
            │  MCP (stdio)
            ▼
     MCP Server (Node + TypeScript)
            │
            ▼
     Local Project Files (read-only)
```

---

---

## 🧰 Available Tools

| Tool Name       | Description |
|-----------------|-------------|
| `list_files`    | List all files in the project |
| `read_file`     | Read a file by relative path |
| `search_code`   | Search text across source files |
| `find_function` | Locate function definitions |

---

## ⚙️ Prerequisites

- Node.js **18+**
- npm **9+**

---

## 🚀 Setup

### 1️⃣ Install Dependencies

```bash
npm install
```

---

### 2️⃣ Configure Project Root

Edit `src/config.ts` and set the absolute path of the project you want to query:

```ts
export const PROJECT_ROOT = "ABSOLUTE_PATH_TO_YOUR_PROJECT";
```

---

### 3️⃣ Build & Run

```bash
npm run build
npm start
```

---

## 🔌 Connecting an MCP Client

Example (Claude Desktop):

```json
{
  "mcpServers": {
    "local-code": {
      "command": "node",
      "args": ["<absolute-path>/dist/index.js"]
    }
  }
}
```

---

## 🔐 Security Model

- Read-only access
- Explicit project root allowlist
- Path traversal protection
- No network access
- No code upload

