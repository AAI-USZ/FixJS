function(err,data){
                        if( err ){ callback(err); return; }
                        // store result
                        if( options.debug ) print_var( data );
                        // if( data )
                            // options.result[data.id] = data;
                        // log('good, all done ' + options.fetchList );

                        // we have to remove the query in order to prevent unwanted recursion
                        delete options.query;
                        // re-check if we need to fetch anything else
                        evalFetchList();
                    }