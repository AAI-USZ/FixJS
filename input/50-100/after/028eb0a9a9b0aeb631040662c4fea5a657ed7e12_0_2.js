function(str) {
  return str.replace(/\-A/g, '%')
    .replace(/\-B/g, '?')
    .replace(/\-C/g, '&')
    .replace(/\-D/g, ':')
    .replace(/\-E/g, '/')
    .replace(/\-F/g, '=')
    .replace(/\-\-/g, '-');
}