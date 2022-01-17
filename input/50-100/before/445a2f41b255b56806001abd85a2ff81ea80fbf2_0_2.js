function( value ) {
            if( Modernizr.localstorage ) {
                var version = localStorage.getItem( "localstorage:version" );
                
                if( version && version.toString() != value ) {
                    localStorage.clear();
                    
                    console.log( "Local Storage is cleared since a different version is detected (from " + version  + " to " + value + ")!" );
                }
                
                localStorage.setItem( "localstorage:version", value.toString());
            }
        }