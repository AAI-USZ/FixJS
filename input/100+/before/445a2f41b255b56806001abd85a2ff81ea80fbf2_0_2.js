function() {
    
    if( Modernizr.localstorage ) {
        var fallback = Backbone.sync;
        
        Backbone.sync = function( method, model, options ) {
            switch( method ) {
                case "create":
                case "update":
                case "delete":
                    fallback.apply( this, arguments );
                    break;
                case "read":
                    if( typeof this.localStorage == "object" ) {
                        var id = this.localStorage.id ? this.localStorage.id : model.id;
                        var timestamp = window.localStorage.getItem( id + ":timestamp" );
                        
                        if( id ) {
                            if( options.forceRefresh || !timestamp || ( this.localStorage.maxRefresh && ((( new Date().getTime()) - timestamp ) > this.localStorage.maxRefresh ))) {
                                var success = options.success;
                                
                                options.success = function( response, status, xhr ) {
                                    try {
                                        localStorage.setItem( id, JSON.stringify( response ));
                                        localStorage.setItem( id + ":timestamp", new Date().getTime());
                                    }
                                    catch( error ) {
                                        if( error == QUOTA_EXCEEDED_ERR ) {
                                            localStorage.clear();
                                        }
                                    }
                                    
                                    if( success ) {
                                        success.apply( this, arguments );
                                    }
                                }
                                
                                fallback.apply( this, [ method, model, options ]);
                            }
                            else {
                                var data = localStorage.getItem( id );
                                
                                setTimeout( function() {
                                    options.success( JSON.parse( data ), "success", null );
                                }, 0 );
                            }
                        }
                        else {
                            fallback.apply( this, arguments );
                        }
                    }
                    else {
                        fallback.apply( this, arguments );
                    }
                    break;
            }
        }
    }
    else {
        console.warn( "Local Storage is not supported!" );
    }
    
    window.BackboneLocalStorage = {
        
        setVersion: function( value ) {
            if( Modernizr.localstorage ) {
                var version = localStorage.getItem( "localstorage:version" );
                
                if( version && version.toString() != value ) {
                    localStorage.clear();
                    
                    console.log( "Local Storage is cleared since a different version is detected (from " + version  + " to " + value + ")!" );
                }
                
                localStorage.setItem( "localstorage:version", value.toString());
            }
        }
        
    };
    
}