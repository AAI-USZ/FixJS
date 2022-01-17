function (errorClass, message) {
    throw new (this.domain.getClass(errorClass)).instance(message);
  }