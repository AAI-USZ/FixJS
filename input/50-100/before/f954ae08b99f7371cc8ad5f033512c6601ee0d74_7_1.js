function(i, entity) {
                    if (debug) console.log('LIST: ' + entity.type);
                    
                    if (entity.type != 'Folder' || !entity.parentFolder) {
                        _Entities.appendObj(entity, null, null, null, false, isIn(entity.id, data.nodesWithChildren));
                    }
                    
                }