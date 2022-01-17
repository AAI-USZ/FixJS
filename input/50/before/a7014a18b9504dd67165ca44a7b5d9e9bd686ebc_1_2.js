function(fileName) {
  return q.ncall(fs.readFile, fs, fileName, 'utf8')
    .fail(exports.throwError);
}