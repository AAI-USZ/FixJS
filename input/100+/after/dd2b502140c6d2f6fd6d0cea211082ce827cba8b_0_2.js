function writeStyle() {
  var styleEl = document.getElementById("SVGFontHelper-style"),
      scriptEl = document.getElementById("SVGFontHelper-data");

  if ( !styleEl ) {
    styleEl = document.createElement( "style" );
    styleEl.id = "SVGFontHelper-style";
    document.head.appendChild( styleEl );
  }

  if ( !scriptEl ) {
    scriptEl = document.createElement( "script" );
    scriptEl.type = "application/json";
    scriptEl.id = "SVGFontHelper-data";
    document.head.appendChild( scriptEl );
  }

  scriptEl.textContent = JSON.stringify( fonts, null, 2 );
  styleEl.textContent = fonts.map(function( description_data ) {
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
  }).join("\n");
}