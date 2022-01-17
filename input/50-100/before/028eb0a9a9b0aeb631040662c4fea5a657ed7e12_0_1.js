function(str) {
  return str.replace(/\-/g, '--')
    .replace(/\%/g, '-A')
    .replace(/\?/g, '-B')
    .replace(/\&/g, '-C')
    .replace(/\:/g, '-D')
    .replace(/\//g, '-E');
}