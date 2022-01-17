function() {
    storage.setReturnTo("http://some.domain/path");
    equal(storage.getReturnTo(), "http://some.domain/path", "setReturnTo/getReturnTo working as expected");
  }