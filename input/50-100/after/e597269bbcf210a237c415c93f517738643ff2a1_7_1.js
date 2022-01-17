function( url, callback, mimeTypeOverride ) {
        var xhr = new XMLHttpRequest();
        xhr.open( "GET", url, true );
        xhr.onreadystatechange = callback;
        xhr.setRequestHeader( "X-Requested-With", "XMLHttpRequest" );
        if( xhr.overrideMimeType && mimeTypeOverride ){
          xhr.overrideMimeType( mimeTypeOverride );
        }
        xhr.send( null );
      }