function( response, status, xhr ) {
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