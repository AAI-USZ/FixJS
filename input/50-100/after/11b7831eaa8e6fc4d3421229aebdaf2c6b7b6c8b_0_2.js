function getFileExtension(filename) {
    var match;

    filename = filename || "";

    if (!(match = /.*\.(\w+)$/.exec(filename))) {
      return null;
    }

    return match[1];
  }