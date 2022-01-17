function _getKeySizeFromYBitlength(size) {
  for (keysize in KEYSIZES) {
    var keysize_nbits = KEYSIZES[keysize].p.bitLength();
    var diff = keysize_nbits - size;

    // extremely unlikely to be more than 30 bits smaller than p
    // 2^-30. FIXME: should we be more tolerant here.
    if (diff >= 0 && diff < 30) {
      return keysize;
    }
  }

  return null;
}