function( value ) {
            _version = value;
            
            if( Modernizr.localstorage ) {
                var version = get( "version" );
                
                if( version && version.toString() != value ) {
                    localStorage.clear();
                    
                    console.log( "Local Storage is cleared since a different version is detected (from " + version  + " to " + value + ")!" );
                }
                
                set( "version", value.toString());
            }
        }