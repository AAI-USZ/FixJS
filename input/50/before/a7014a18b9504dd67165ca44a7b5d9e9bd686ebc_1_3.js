function(fileName, contents) {
  return q.ncall(fs.writeFile, fs, fileName, contents)
    .fail(exports.throwError);
}