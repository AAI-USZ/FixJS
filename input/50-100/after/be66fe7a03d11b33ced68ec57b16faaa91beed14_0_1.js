function _getResponseLength(chunk) {
  return (chunk[0] << 24) +
         (chunk[1] << 16) +
         (chunk[2] << 8)  +
         (chunk[3]);
}