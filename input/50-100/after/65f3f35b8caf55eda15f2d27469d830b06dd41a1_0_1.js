function(filename)
  {
    if (filename == null || filename == "") {
      return null;
    }
    let fileTypeRex = /^[^?&]*(\.[a-z0-9]+)([?&\)].*)?$/i;
    // image URLs sometimes don't have an explicit type; default to .jpg.
    let type = ".jpg";
    if (fileTypeRex.test(filename)) {
      type = filename.replace(fileTypeRex, "$1");
    }
    return type;
  }