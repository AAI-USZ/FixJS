function (dest) {
  sys.puts("building...");
  dest = dest || prefix + ".js";
  build.build(dest);
  sys.puts("> " + dest);
}