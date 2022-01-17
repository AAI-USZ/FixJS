function(err, retrievedEntityId){
                        if( err ){ callback(err); return; }

                        // set the resultant id on the mystery model to allow the parsing of the attributes to continue
                        if( retrievedEntityId )
                            model.set({id:retrievedEntityId});
                        // print_var( model );

                        // we have to remove the query in order to prevent unwanted recursion
                        delete options.query;
                        // re-check if we need to fetch anything else
                        evalFetchList();
                    }