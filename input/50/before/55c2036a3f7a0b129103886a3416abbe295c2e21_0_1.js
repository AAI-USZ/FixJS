function extend(dest, src) {
  for (var prop in src) {
    if (src.hasOwnProperty(dest)) {
      dest[prop] = src[prop]
    }
  }
  return dest
}