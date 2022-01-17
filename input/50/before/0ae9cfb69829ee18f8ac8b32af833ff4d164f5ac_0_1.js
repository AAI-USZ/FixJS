function (type, def) {
    return EXTENSION_TO_MIME[
      type[0] == "." ?
        type :
        "." + type
    ] || def || "text/html";
  }