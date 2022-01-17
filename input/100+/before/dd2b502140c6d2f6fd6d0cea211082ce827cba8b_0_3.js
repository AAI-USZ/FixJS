function makeDataURIForFont( description, data ) {
  var svgEl = document.createElement( "svg" ),
      defsEl = document.createElementNS( NS_SVG, "defs" ),
      fontEl = document.createElementNS( NS_SVG, "font" ),
      fontFaceEl = document.createElementNS( NS_SVG, "font-face" );

  svgEl.appendChild( defsEl );
  defsEl.appendChild( fontEl );

  fontFaceEl.setAttribute( "font-family", description.fontFamily );
  // fontFaceEl.setAttribute( "font-style", description.fontStyle );
  // fontFaceEl.setAttribute( "font-variant", description.fontVariant );
  // fontFaceEl.setAttribute( "font-weight", description.fontWeight );
  // fontFaceEl.setAttribute( "font-stretch", description.fontStretch );
  // fontFaceEl.setAttribute( "font-units-per-em", description.unitsPerEm );
  // fontFaceEl.setAttribute( "ascent", description.ascent );
  // fontFaceEl.setAttribute( "descent", description.descent );

  fontEl.appendChild( fontFaceEl );

  if ( data.missingGlyph ) {
    var missingGlyphEl = document.createElementNS( NS_SVG, "missing-glyph" );
    missingGlyphEl.setAttribute( "d", data.missingGlyph.d );
    missingGlyphEl.setAttribute( "horiz-adv-x", data.missingGlyph.horizAdvX );

    fontEl.appendChild( missingGlyphEl );
  }

  for ( var unicode in data.unicodeGlyphs ) {
    var newGlyphEl = document.createElementNS( NS_SVG, "glyph" );

    newGlyphEl.setAttribute( "unicode", unicode );
    newGlyphEl.setAttribute( "d", data.unicodeGlyphs[ unicode ].d );
    newGlyphEl.setAttribute( "horiz-adv-x", data.unicodeGlyphs[ unicode ].horizAdvX );

    fontEl.appendChild( newGlyphEl );
  }
  var body = svgEl.innerHTML
    // .replace(/><\/glyph>/g, "/>")
    // .replace(/><\/missing-glyph>/, "/>")
    // .replace(/><\/font-face>/, "/>");
  var utf8Body = unescape( encodeURIComponent( body ) );
  
  var s = '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg">' + utf8Body + '</svg>';
  document.body.appendChild(svgEl);
  return "data:image/svg+xml;base64," + btoa( s );
}