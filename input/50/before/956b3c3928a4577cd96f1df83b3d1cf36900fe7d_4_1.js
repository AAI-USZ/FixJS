function(error, result){
                                if (error) callBack.error(error);
                                
                                readyFn(client);
                            }