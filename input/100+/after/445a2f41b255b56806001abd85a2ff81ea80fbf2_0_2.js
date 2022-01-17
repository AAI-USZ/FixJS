function() {
    
    var _version = "";
    var _prefix = "unknown:";
    
    function set( key, value ) {
        return localStorage.setItem( _prefix + key, JSON.stringify( value ));
    };
    
    function get( key ) {
        return JSON.parse( localStorage.getItem( _prefix + key ));
    };
    
    function reset() {
        for( var prop in localStorage ) {
            if( prop.indexOf( _prefix ) === 0 ) {
                return localStorage.removeItem( prop );
            }
        }
    };
    
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
                        var timestamp = get( id + ":timestamp" );
                        
                        if( id ) {
                            if( options.forceRefresh || !timestamp || ( this.localStorage.maxRefresh && ((( new Date().getTime()) - timestamp ) > this.localStorage.maxRefresh ))) {
                                var success = options.success;
                                
                                options.success = function( response, status, xhr ) {
                                    try {
                                        set( id, response );
                                        set( id + ":timestamp", new Date().getTime());
                                    }
                                    catch( error ) {
                                        if( error == QUOTA_EXCEEDED_ERR ) {
                                            reset();
                                        }
                                    }
                                    
                                    if( success ) {
                                        success.apply( this, arguments );
                                    }
                                }
                                
                                fallback.apply( this, [ method, model, options ]);
                            }
                            else {
                                var data = get( id );
                                
                                setTimeout( function() {
                                    options.success( data, "success", null );
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
            _version = value;
            
            if( Modernizr.localstorage ) {
                var version = get( "version" );
                
                if( version && version.toString() != value ) {
                    localStorage.clear();
                    
                    console.log( "Local Storage is cleared since a different version is detected (from " + version  + " to " + value + ")!" );
                }
                
                set( "version", value.toString());
            }
        },
        
        setPrefix: function( value ) {
            _prefix = value + ":";
        }
        
    };
    
}