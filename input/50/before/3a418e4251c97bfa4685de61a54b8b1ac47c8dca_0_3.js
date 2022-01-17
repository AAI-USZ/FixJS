function(){
          for( var i=0; i<arguments.length; ++i ){
            _rootElement.querySelector( arguments[ i ] ).setAttribute( "disabled", true );
          }
        }