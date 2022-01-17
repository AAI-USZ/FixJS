function( url, success, isScript ) {

    var head = document.head || document.getElementsByTagName( "head" )[ 0 ] || document.documentElement,
      script = document.createElement( "script" ),
      paramStr = url.split( "?" )[ 1 ],
      isFired = false,
      params = [],
      callback, parts, callparam;

    if ( paramStr && !isScript ) {
      params = paramStr.split( "&" );
    }

    if ( params.length ) {
      parts = params[ params.length - 1 ].split( "=" );
    }

    callback = params.length ? ( parts[ 1 ] ? parts[ 1 ] : parts[ 0 ]  ) : "jsonp";

    if ( !paramStr && !isScript ) {
      url += "?callback=" + callback;
    }

    if ( callback && !isScript ) {

      //  If a callback name already exists
      if ( !!window[ callback ] ) {
        //  Create a new unique callback name
        callback = Popcorn.guid( callback );
      }

      //  Define the JSONP success callback globally
      window[ callback ] = function( data ) {
        // Fire success callbacks
        success && success( data );
        isFired = true;
      };

      //  Replace callback param and callback name
      url = url.replace( parts.join( "=" ), parts[ 0 ] + "=" + callback );
    }

    script.addEventListener( "load",  function() {

      //  Handling remote script loading callbacks
      if ( isScript ) {
        //  getScript
        success && success();
      }

      //  Executing for JSONP requests
      if ( isFired ) {
        //  Garbage collect the callback
        delete window[ callback ];
      }
      //  Garbage collect the script resource
      head.removeChild( script );
    }, false );

    script.src = url;

    head.insertBefore( script, head.firstChild );

    return;
  }