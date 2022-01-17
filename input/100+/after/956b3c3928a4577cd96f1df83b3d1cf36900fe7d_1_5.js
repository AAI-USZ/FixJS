function (callBack, changedEntities) {
        if (this.ChangeCollector && this.ChangeCollector instanceof $data.Notifications.ChangeCollectorBase)
            this.ChangeCollector.processChangedData(changedEntities);

        var eventData = {};
        var ctx = this;
        changedEntities.forEach(function (entity) {
            var oes = entity.data.entityState;
            
            entity.data.entityState = $data.EntityState.Unchanged;
            entity.data.changedProperties = [];
            entity.physicalData = undefined;
            
            var n = entity.entitySet.elementType.name;
            var es = ctx._entitySetReferences[n];
            if (es.afterCreate || es.afterUpdate || es.afterDelete){
                if (!eventData[n]) eventData[n] = {};
                    
                switch (oes){
                    case $data.EntityState.Added:
                        if (es.afterCreate){
                            if (!eventData[n].createAll) eventData[n].createAll = [];
                            eventData[n].createAll.push(entity);
                        }
                        break;
                    case $data.EntityState.Modified:
                        if (es.afterUpdate){
                            if (!eventData[n].modifyAll) eventData[n].modifyAll = [];
                            eventData[n].modifyAll.push(entity);
                        }
                        break;
                    case $data.EntityState.Deleted:
                        if (es.afterDelete){
                            if (!eventData[n].deleteAll) eventData[n].deleteAll = [];
                            eventData[n].deleteAll.push(entity);
                        }
                        break;
                }
            }
        });
        
        var ies = Object.getOwnPropertyNames(eventData);
        var i = 0;
        var ctx = this;
        var cmd = ['afterUpdate', 'afterDelete', 'afterCreate'];
        var cmdAll = {
            afterCreate: 'createAll',
            afterDelete: 'deleteAll',
            afterUpdate: 'modifyAll'
        };
        
        var readyFn = function(){
            if (!ctx.trackChanges) {
                ctx.stateManager.reset();
            }
            
            callBack.success(changedEntities.length);
        };
        
        var callbackFn = function(){
            var es = ctx._entitySetReferences[ies[i]];
            var c = cmd.pop();
            var ed = eventData[ies[i]];
            var all = ed[cmdAll[c]];
            if (all){
                var m = all.map(function(it){ return it.data; });
                if (!cmd.length){
                    cmd = ['afterUpdate', 'afterDelete', 'afterCreate'];
                    i++;
                }
                
                var r = es[c].call(ctx, m);
                if (typeof r === 'function'){
                    r.call(ctx, i < ies.length ? callbackFn : readyFn, m);
                }else{
                    if (i < ies.length) callbackFn();
                    else readyFn();
                }
            }else{
                if (!cmd.length){
                    cmd = ['afterUpdate', 'afterDelete', 'afterCreate'];
                    i++;
                }
                
                if (i < ies.length) callbackFn();
                else readyFn();
            }
        };
        
        if (i < ies.length) callbackFn();
        else readyFn();
    }