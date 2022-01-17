function (error) {
    if (error instanceof Error) {
      var type = this.domain.getClass(error.name);
      if (type) {
        return new type.instance(error.message);
      }
      unexpected("Can't translate error: " + error);
    }
    return error;
  }