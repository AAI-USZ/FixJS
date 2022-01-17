function makeName(kind) {
    if (idNo === Number.MAX_VALUE) {
      idNo = 0;
    }
    return "__" + kind + (idNo++);
  }