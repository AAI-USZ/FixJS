function(error, result){
                    if (error) callBack.error(error);
                    
                    successItems += result.length;
                    
                    if (c.removeAll && c.removeAll.length){
                        removeFn(client, c, collection);
                    }else{
                        callBack.success(successItems);
                        client.close();
                    }
                }