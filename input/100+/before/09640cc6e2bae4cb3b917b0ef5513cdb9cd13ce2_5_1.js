function(callBack, changedItems){
        var self = this;
        if (changedItems.length){
            var independentBlocks = this.buildIndependentBlocks(changedItems);
            
            var convertedItems = [];
            var collections = {};
            for (var i = 0; i < independentBlocks.length; i++){
                for (var j = 0; j < independentBlocks[i].length; j++) {
                    convertedItems.push(independentBlocks[i][j].data);
                    
                    var es = collections[independentBlocks[i][j].entitySet.name];
                    if (!es){
                        es = {};
                        collections[independentBlocks[i][j].entitySet.name] = es;
                    }
                    
                    switch (independentBlocks[i][j].data.entityState){
                        case $data.EntityState.Unchanged: continue; break;
                        case $data.EntityState.Added:
                            if (!es.insertAll) es.insertAll = [];
                            es.insertAll.push(this.save_getInitData(independentBlocks[i][j], convertedItems));
                            break;
                        case $data.EntityState.Modified:
                            if (!es.updateAll) es.updateAll = [];
                            es.updateAll.push({ data: this.save_getInitData(independentBlocks[i][j], convertedItems), type: independentBlocks[i][j].data.getType() });
                            break;
                        case $data.EntityState.Deleted:
                            if (!es.removeAll) es.removeAll = [];
                            es.removeAll.push(this.save_getInitData(independentBlocks[i][j], convertedItems));
                            break;
                        default: Guard.raise(new Exception("Not supported Entity state"));
                    }
                }
            }
            
            var successItems = 0;
            var server = this._getServer();
            
            var counterState = 0;
            var counterFn = function(callback){
                if (--counterState == 0) callback();
            }
            
            var insertFn = function(client, c, collection){
                collection.insert(c.insertAll, { safe: true }, function(error, result){
                    if (error) callBack.error(error);
                    
                    successItems += result.length;
                    
                    if (c.removeAll && c.removeAll.length){
                        removeFn(client, c, collection);
                    }else{
                        if (c.updateAll && c.updateAll.length){
                            updateFn(client, c, collection);
                        }else{
                            callBack.success(successItems);
                            client.close();
                        }
                    }
                });
            };
            
            var updateFn = function(client, c, collection){
                counterState = c.updateAll.length;
                for (var i = 0; i < c.updateAll.length; i++){
                    var u = c.updateAll[i];
                    var where = {};
                    
                    var keys = u.type.memberDefinitions.getKeyProperties();
                    for (var j = 0; j < keys.length; j++){
                        var k = keys[j];
                        where[k.computed ? '_id' : k.name] = u.data[k.computed ? '_id' : k.name];
                    }
                    
                    var set = {};
                    var props = u.type.memberDefinitions.getPublicMappedProperties();
                    for (var j = 0; j < props.length; j++){
                        var p = props[j];
                        if (!p.computed){
                            set[p.name] = u.data[p.name];
                        }
                    }
                    
                    collection.update(where, { $set: set }, { safe: true }, function(error, result){
                        if (error) callBack.error(error);
                        
                        successItems++;
                        counterFn(function(){
                            callBack.success(successItems);
                            client.close();
                        });
                    });
                }
                callBack.success(successItems);
                client.close();
            };
            
            var removeFn = function(client, c, collection){
                counterState = c.removeAll.length;
                for (var i = 0; i < c.removeAll.length; i++){
                    collection.remove(c.removeAll[i], { safe: true }, function(error, cnt){
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
                    });
                }
            };
            
            for (var es in collections){
                if (collections.hasOwnProperty(es)){
                    var c = collections[es];
                    new this.driver.Db(this.providerConfiguration.databaseName, server, {}).open(function(error, client){
                        if (error) callBack.error(error);
                        
                        var collection = new self.driver.Collection(client, es);
                        if (c.insertAll && c.insertAll.length){
                            insertFn(client, c, collection);
                        }else{
                            if (c.removeAll && c.removeAll.length){
                                removeFn(client, c, collection);
                            }else{
                                if (c.updateAll && c.updateAll.length){
                                    updateFn(client, c, collection);
                                }else{
                                    callBack.success(0);
                                    client.close();
                                }
                            }
                        }
                    });
                }
            }
        }else{
            callBack.success(0);
        }
    }