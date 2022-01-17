function( method, model, options ) {
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