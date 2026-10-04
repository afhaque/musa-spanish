// Extracts the word list from app.js into wordlist.txt (lang|slug|text per line)
// for genaudio.sh. Run: node extract-words.js
const fs = require("fs");
const src = fs.readFileSync(__dirname + "/app.js", "utf8");
const start = src.indexOf("const GAMES = ") + "const GAMES = ".length;
const end = src.indexOf("\n};", start) + 2;
const GAMES = eval("(" + src.slice(start, end) + ")");
const lines = [];
for (const g of Object.values(GAMES))
  for (const cards of Object.values(g.categories))
    for (const c of cards)
      lines.push([g.lang, c.slug, c.word].join("|"));
fs.writeFileSync(__dirname + "/wordlist.txt", lines.join("\n") + "\n");
console.log(lines.length + " pairs -> wordlist.txt");
