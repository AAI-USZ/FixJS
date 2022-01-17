function(contents, type, baseClass) {
    var cssClass;
    if (contents == null) contents = "";
    if (baseClass == null) baseClass = "label";
    cssClass = baseClass;
    if (type != null) cssClass += " " + baseClass + "-" + type;
    return Luca.util.make("span", {
      "class": cssClass
    }, contents);
  }