function( data ) {
    var returnData = {
          title: "",
          remote: "",
          data: []
        },
        node,
        numTracks = 0,
        region;

    // Null checks
    if ( !data.xml || !data.xml.documentElement )
      return returnData;

    node = data.xml.documentElement.firstChild;

    if ( !node ) {
      return returnData;
    }

    // Find body tag
    while ( node.nodeName !== "body" ) {
      node = node.nextSibling;
    }

    if ( node ) {
      region = node.getAttribute( "region" );
      parseChildren( node, 0 );
    }

    return returnData;


    // Parse the children of the given node
    function parseChildren( node, timeOffset ) {
      var currNode = node.firstChild,
          sub,
          newOffset;

      while ( currNode ) {
        if ( currNode.nodeType === 1 ) {
          if ( currNode.nodeName === "p" ) {
            // p is a textual node, process contents as subtitle
            sub = parseNode( currNode, timeOffset );
            returnData.data.push( createTrack( "subtitle", sub ) );
            numTracks++;
          } else if ( currNode.nodeName === "div" ) {
            // div is container for subtitles, recurse
            newOffset = toSeconds( currNode.getAttribute( "begin" ) );

            if (newOffset < 0 ) {
              newOffset = timeOffset;
            }

            parseChildren( currNode, newOffset );
          }
        }

        currNode = currNode.nextSibling;
      }
    }

    // Parse a node for text content
    function parseNode( node, timeOffset ) {
      var rWhitespace = /^[\s]+|[\s]+$/gm,
          rLineBreak = /(?:\r\n|\r|\n)/gm,
          sub = {};

      // Trim left and right whitespace from text and convert non-explicit line breaks
      sub.text = node.textContent.replace( rWhitespace, "" ).replace( rLineBreak, "<br />" );
      sub.id = node.getAttribute( "xml:id" ) || node.getAttribute( "id" );
      sub.start = toSeconds ( node.getAttribute( "begin" ), timeOffset );
      sub.end = toSeconds( node.getAttribute( "end" ), timeOffset );
      sub.target = region;

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

      return sub;
    }
  }