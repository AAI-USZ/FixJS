function makeFontDescription( fontFaceEl ) {
  var description = {
    fontFamily: fontFaceEl.getAttribute( "font-family" ),
    fontStyle: fontFaceEl.getAttribute( "font-style" ) || "all",
    fontVariant: fontFaceEl.getAttribute( "font-variant" ) || "normal",
    fontWeight: fontFaceEl.getAttribute( "font-weight" ) || "normal",
    fontStretch: fontFaceEl.getAttribute( "font-stretch" ) || "all",
    unitsPerEm: fontFaceEl.getAttribute( "units-per-em" ) || "1000",
    ascent: fontFaceEl.getAttribute( "ascent" ) || "",
    descent: fontFaceEl.getAttribute( "descent" ) || ""
  };

  if ( !description.fontFamily ) {
    throw new Error("font-family not specified");
  }
  
  return description;
}