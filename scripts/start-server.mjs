import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const args = process.argv.slice(2);
const portFlagIndex = args.indexOf("--port");
const equalsPort = args.find((argument) => argument.startsWith("--port="));
const rawPort =
  portFlagIndex >= 0 ? args[portFlagIndex + 1] : equalsPort ? equalsPort.slice("--port=".length) : "4173";
const port = Number(rawPort);

if (!Number.isInteger(port) || port < 1 || port > 65_535) {
  console.error("Port must be an integer from 1 to 65535. Example: npm start -- --port 4174");
  process.exit(1);
}

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".md", "text/markdown; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
]);

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method not allowed");
    return;
  }

  try {
    const requestUrl = new URL(request.url ?? "/", "http://127.0.0.1");
    const relativeRequest = decodeURIComponent(requestUrl.pathname) === "/"
      ? "index.html"
      : decodeURIComponent(requestUrl.pathname).replace(/^\/+/, "");
    const filePath = path.resolve(repositoryRoot, relativeRequest);
    const relativePath = path.relative(repositoryRoot, filePath);

    if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    const fileInfo = await stat(filePath);
    if (!fileInfo.isFile()) {
      throw new Error("Not a file");
    }

    const body = await readFile(filePath);
    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Length": body.byteLength,
      "Content-Type": contentTypes.get(path.extname(filePath)) ?? "application/octet-stream",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Glitch Squadron is running at http://127.0.0.1:${port}`);
  console.log("Press Ctrl+C to stop the server.");
});
