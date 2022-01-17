function(client, c, collection){
            counterState = c.removeAll.length;
            for (var i = 0; i < c.removeAll.length; i++){
                var r = c.removeAll[i];
                
                var keys = Container.resolveType(r.type).memberDefinitions.getKeyProperties();
                for (var j = 0; j < keys.length; j++){
                    var k = keys[j];
                    r.data[k.computed ? '_id' : k.name] = self.fieldConverter.toDb[Container.resolveName(Container.resolveType(k.type))](r.data[k.computed ? '_id' : k.name]);
                }
                
                collection.remove(r.data, { safe: true }, function(error, cnt){
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
        }