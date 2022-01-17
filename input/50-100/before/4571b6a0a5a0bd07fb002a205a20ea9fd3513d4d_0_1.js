function (file, dest) {
  file = file || prefix + ".js";
  dest = dest || prefix + ".min.js";

  var minified = minify(fs.readFileSync(file, "utf-8"));
  fs.writeFileSync(dest, minified, "utf-8");
  sys.puts("> " + dest)
}