function(fileName, binary) {
  if (binary) {
    return q.ncall(fs.readFile, fs, fileName);
  } else {
    return q.ncall(fs.readFile, fs, fileName, 'utf8');
  }
}