function ifParsed(res, block) {
    if (res[1]) {
      return res;
    } else {
      return block(res[0], res[2]);
    }
  }