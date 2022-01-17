function(blockError) {
                        res[id] = typeof blockError === 'string'?
                            { error : { message : blockError }} :
                            { error : blockError };
                    }