function(model, resp){
                            if(error) error(model, resp);
                            error(model, resp);
                            if(model.__fetchErrorCallback){
                                var tmp = model.__fetchErrorCallback;
                                model.__fetchErrorCallback = null;
                                tmp.apply(model);
                            }
                        }