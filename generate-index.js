const fs = require("fs");
const path = require("path");

const postsDir = path.join(__dirname, "vikposts");
const outputFile = path.join(postsDir, "index.json");

function extractMetadata(content) {
  const match = content.match(/<!--([\s\S]*?)-->/);
  if (!match) return {};

  const lines = match[1].trim().split("\n");
  const metadata = {};

  lines.forEach(line => {
    const [key, ...rest] = line.split(":");
    metadata[key.trim()] = rest.join(":").trim();
  });

  return metadata;
}

function generateIndex() {
  const files = fs.readdirSync(postsDir).filter(file => file.endsWith(".md"));

  const posts = files.map(filename => {
    const content = fs.readFileSync(path.join(postsDir, filename), "utf-8");
    const meta = extractMetadata(content);
    return {
      filename,
      ...meta
    };
  });

  fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
  console.log(`✅ index.json gegenereerd (${posts.length} posts)`);
}

generateIndex();
