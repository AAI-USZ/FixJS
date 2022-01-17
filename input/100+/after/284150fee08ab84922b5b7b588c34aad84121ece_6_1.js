function(data){
        var rootScene = new pvc.visual.Scene(null, {panel: this, group: data});
        
        data.children()
            .each(function(childData){
                var childScene = new pvc.visual.Scene(rootScene, {group: childData});
                var valueVar = 
                    childScene.vars.tick = 
                        new pvc.visual.ValueLabelVar(
                                    childData.value,
                                    childData.label);
                
                valueVar.absLabel = childData.absLabel;
        });

        /* Add a last scene, with the same data group */
        var lastScene  = rootScene.lastChild;
        if(lastScene){
            var endScene = new pvc.visual.Scene(rootScene, {group: lastScene.group});
            endScene.vars.tick = lastScene.vars.tick;
        }

        return rootScene;
    }