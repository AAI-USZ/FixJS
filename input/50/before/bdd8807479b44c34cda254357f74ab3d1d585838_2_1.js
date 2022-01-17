function (main) {
  return fs.existsSync(polpetta.resolve(this + main));
}