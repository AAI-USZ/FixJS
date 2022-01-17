function (dest) {
  util.puts("building...");
  dest = dest || prefix + ".js";

  build.build(dest);
  util.puts("> " + dest);
}