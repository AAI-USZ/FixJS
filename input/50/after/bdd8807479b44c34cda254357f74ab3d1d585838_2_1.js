function (main) {
  return this.found || (
    this.found = fs.existsSync(this + main)
  );
}