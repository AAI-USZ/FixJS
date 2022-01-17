function () {
          for( var e in _listeners ){
            if( e !== "close" ){
              _internal.unlisten( e, _listeners[ e ] );
            }
          }
          _modal.destroy();
          _modal = null;
          document.removeEventListener( "keydown", onKeyDown, false );
          _internal.dispatch( "close" );
          _external.dispatch( "close" );
        }