function parseNode( node, timeOffset, region ) {
    var sub = {};

    // Trim left and right whitespace from text and convert non-explicit line breaks
    sub.text = node.textContent.replace( rWhitespace, "" ).replace( rLineBreak, "<br />" );
    sub.id = node.getAttribute( "xml:id" ) || node.getAttribute( "id" );
    sub.start = toSeconds ( node.getAttribute( "begin" ), timeOffset );
    sub.end = toSeconds( node.getAttribute( "end" ), timeOffset );
    sub.target = getNodeRegion( node, region );

    if ( sub.end < 0 ) {
      // No end given, infer duration if possible
      // Otherwise, give end as MAX_VALUE
      sub.end = toSeconds( node.getAttribute( "duration" ), 0 );

      if ( sub.end >= 0 ) {
        sub.end += sub.start;
      } else {
        sub.end = Number.MAX_VALUE;
      }
    }

    return { subtitle : sub };
  }