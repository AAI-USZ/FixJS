function(error, result){
                if (error) callBack.error(error);
                
                for (var k = 0; k < result.length; k++){
                    var it = result[k];
                    var d = c.insertAll[k];
                    var props = Container.resolveType(d.type).memberDefinitions.getPublicMappedProperties();
                    for (var j = 0; j < props.length; j++){
                        var p = props[j];
                        d.entity[p.name] = self.fieldConverter.fromDb[Container.resolveName(Container.resolveType(p.type))](it[p.computed ? '_id' : p.name]);
                    }
                }
                
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
            }