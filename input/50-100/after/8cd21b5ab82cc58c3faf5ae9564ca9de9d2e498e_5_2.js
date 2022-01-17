function( e ) {
          var newState = !_editorAreaDOMRoot.classList.contains( "minimized" );
          toggler.state = newState;
          if ( newState ) {
            _editorAreaDOMRoot.classList.add( "minimized" );
          }
          else {
            _editorAreaDOMRoot.classList.remove( "minimized" );
          }
        }