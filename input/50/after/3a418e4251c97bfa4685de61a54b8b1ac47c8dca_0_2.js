function(){
          var i = arguments.length;
          while ( i-- ) {
            _rootElement.querySelector( arguments[ i ] ).removeAttribute( "disabled" );
          }
        }