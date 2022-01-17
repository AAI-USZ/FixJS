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
                            es.updateAll.push({ data: this.save_getInitData(independentBlocks[i][j], convertedItems), type: Container.resolveName(independentBlocks[i][j].data.getType()) });
                            break;
                        case $data.EntityState.Deleted:
                            if (!es.removeAll) es.removeAll = [];
                            es.removeAll.push({ data: this.save_getInitData(independentBlocks[i][j], convertedItems), type: Container.resolveName(independentBlocks[i][j].data.getType()) });
                            break;
                        default: Guard.raise(new Exception("Not supported Entity state"));
                    }
                }
            }
            
            this._saveCollections(callBack, collections);
        }else{
            callBack.success(0);
        }
    }