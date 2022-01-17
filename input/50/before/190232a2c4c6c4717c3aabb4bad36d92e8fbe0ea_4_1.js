function loadFile(name) {
  return fs.readFileSync(
    __dirname + '/../files/' + name + (path.extname(name) ? '' : '.ometajs')
  ).toString()
}