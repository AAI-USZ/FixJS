function( response, status, xhr ) {
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