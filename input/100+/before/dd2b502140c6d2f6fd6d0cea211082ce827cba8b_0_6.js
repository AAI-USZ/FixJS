function compareFontDescriptions( a, b ) {
  if ( a.fontFamily < b.fontFamily ) return -1;
  if ( a.fontFamily > b.fontFamily ) return +1;
  if ( a.fontStyle < b.fontStyle ) return -1;
  if ( a.fontStyle > b.fontStyle ) return +1;
  if ( a.fontVariant < b.fontVariant ) return -1;
  if ( a.fontVariant > b.fontVariant ) return +1;
  if ( a.fontWeight < b.fontWeight ) return -1;
  if ( a.fontWeight > b.fontWeight ) return +1;
  if ( a.fontStretch < b.fontStretch ) return -1;
  if ( a.fontStretch > b.fontStretch ) return +1;
  if ( a.unitsPerEm < b.unitsPerEm ) return -1;
  if ( a.unitsPerEm > b.unitsPerEm ) return +1;
  if ( a.ascent < b.ascent ) return -1;
  if ( a.ascent > b.ascent ) return +1;
  if ( a.descent < b.descent ) return -1;
  if ( a.descent > b.descent ) return +1;
  return 0;
}