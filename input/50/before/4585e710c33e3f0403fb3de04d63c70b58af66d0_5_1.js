function mkdir_p(p) {
  if (!path.existsSync(p)) {
    mkdir_p(path.dirname(p));
    fs.mkdirSync(p, "0755");
  }
}