function MultipartParser(str) {
    if (str != null) {
      this.initWithBoundary(str);
    }
  }