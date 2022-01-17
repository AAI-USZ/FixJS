function(error, cnt){
                    if (error) callBack.error(error);
                    
                    successItems += cnt;
                    counterFn(function(){
                        if (c.updateAll && c.updateAll.length){
                            updateFn(client, c, collection);
                        }else{
                            callBack.success(successItems);
                            client.close();
                        }
                    });
                }