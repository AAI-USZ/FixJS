function( e ) {
          var newState = !editorAreaDOMRoot.classList.contains( "minimized" );
          toggler.state = newState;
          if ( newState ) {
            editorAreaDOMRoot.classList.add( "minimized" );
          }
          else {
            editorAreaDOMRoot.classList.remove( "minimized" ); 
          }
        }