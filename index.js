const fs = require("fs");
const http = require("http");
const path = require("path");

const root = __dirname;
const port = process.env.PORT || 3000;
const defaultPrototype = "/prototypes/auditos-v0-11.html";

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

function safePath(url) {
  const urlPath = decodeURIComponent(url.split("?")[0]);
  const requested = urlPath === "/" ? defaultPrototype : urlPath;
  const fullPath = path.resolve(path.join(root, path.normalize(requested)));
  return fullPath.startsWith(root) ? fullPath : null;
}

http.createServer((request, response) => {
  const fullPath = safePath(request.url || "/");

  if (!fullPath || !fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "content-type": contentTypes[path.extname(fullPath)] || "application/octet-stream",
    "cache-control": "no-store",
  });
  fs.createReadStream(fullPath).pipe(response);
}).listen(port, "0.0.0.0", () => {
  console.log(`Audit OS static prototype listening on :${port}`);
});
