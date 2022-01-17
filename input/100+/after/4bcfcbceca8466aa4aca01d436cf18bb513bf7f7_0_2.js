function calcTextureScale(v) {
    if (v === 0 || v === 0xffff) {
      return 1.0;
    }

    return v / 65536.0;
  }