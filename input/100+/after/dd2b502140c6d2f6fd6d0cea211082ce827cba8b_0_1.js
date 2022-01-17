function( description_data ) {
    var description = description_data[0], data = description_data[1];

    return "@font-face {\n" +
      "  font-family: \"" + description.fontFamily + "\";\n" +
      "  font-style: " + description.fontStyle + ";\n" +
      "  font-size: " + description.fontSize + ";\n" +
      "  font-variant: " + description.fontVariant + ";\n" +
      "  font-weight: " + description.fontWeight + ";\n" +
      "  font-stretch: " + description.fontStretch + ";\n" +
      "  units-per-em: " + description.unitsPerEm + ";\n" +
      (description.ascent ? "  ascent: " + description.ascent + ";\n" : "") +
      (description.descent ? "  descent: " + description.descent + ";\n" : "") +
      "  src: local(\"" + description.fontFamily + "\"),\n" +
      "       url(\"" + makeDataURIForFont( description, data ) + "\") format(\"svg\");\n" +
    " }";
  }