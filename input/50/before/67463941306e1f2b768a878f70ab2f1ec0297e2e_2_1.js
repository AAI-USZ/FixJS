function (file) {
  var exists = path.existsSync(file)
  if (!exists) {
    var sample_file = './' + path.basename(file)
    fs.writeFileSync(file, fs.readFileSync(sample_file))
    review_required = true
  }
}