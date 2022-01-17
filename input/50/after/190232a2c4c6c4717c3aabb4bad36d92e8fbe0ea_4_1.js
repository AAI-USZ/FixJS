function loadFile(name) {
  return fs.readFileSync(
    path.resolve(
      __dirname,
      '../files',
      name + (path.extname(name) ? '' : '.ometajs')
    )
  ).toString()
}