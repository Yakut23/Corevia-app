// Nakili pdf.js kutoka node_modules kwenda www/ ili PDF ifunguke bila mtandao.
const fs = require("fs");
const path = require("path");
const src = path.join(__dirname, "..", "node_modules", "pdfjs-dist", "build");
const dst = path.join(__dirname, "..", "www");
["pdf.min.js", "pdf.worker.min.js"].forEach((f) => {
  const from = path.join(src, f);
  if (!fs.existsSync(from)) {
    console.error("Haipatikani: " + from + " (endesha npm install kwanza)");
    process.exit(1);
  }
  fs.copyFileSync(from, path.join(dst, f));
  console.log("Imenakiliwa: " + f);
});
