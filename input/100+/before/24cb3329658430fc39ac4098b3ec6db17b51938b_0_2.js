function () { 
                        var response; 
                        if (param.data && param.data.clientRequestID) {
                            if (param.data.clientRequestID != 'PRG') {
                                for (var name in requests) {
                                    var nameValue = requests[name];
                                    for (var i = 0; i < nameValue.length ; i++) {
                                        if (nameValue[i].requestId == param.data.clientRequestID)
                                            response = nameValue[i];
                                    }
                                }
        
                                if (response) {
                                    response.data = {};
                                    response.data[response.type] = data[response.type];
                                    response.metadata = metadata; 
                                } 
                            
                                if (param.data.PluginKey) 
                                    response = param.data.PluginKey != "Lazy" ? response.data[param.data.PluginKey] : lazyData;
                            }
                            else
                                response = prgData;
                            
                            if (param.complete)
                                param.complete();
                        } 
                        else { 
                            param.complete(null, (random(11) != 10 ? 'Success' : 'Fail')); 
                            response = radomResponse();
                        }
                        
                        param.success(response);
                    }