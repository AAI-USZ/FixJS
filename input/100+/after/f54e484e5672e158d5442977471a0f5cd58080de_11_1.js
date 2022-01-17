function( data ) {
    const parts = data.match( MSG )
        , out = []
    var i = 0
      , l = 0
      , msg = null
    if ( buf.length )
      parts.unshift.apply( parts, buf.splice( 0 ) )
    for ( l = parts.length ; i < l; ++i ) {
      out.push( parts[i] )
      if ( parts[i].lastIndexOf( SEP ) === parts[i].length - SEP.length ) {
        msg = out.splice( 0 ).join( "" )
        mockServer.received.unshift( msg )
        mockServer.emit( "message", msg )
      }
    }
    if ( out.length )
      buf.push.apply( buf, out )
  }