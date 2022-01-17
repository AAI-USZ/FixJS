function (value) {
    // Prepend with zeroes: 0000aaaa 0000bbbb is different than aaaabbbb
    // Do a bit shift no-op to force this value to be treated as unsigned.
    return ('00000000' + (value >>> 0).toString(16)).slice(-8);
  }