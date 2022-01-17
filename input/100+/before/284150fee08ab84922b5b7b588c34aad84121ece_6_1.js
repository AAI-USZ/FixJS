function(data){
        var rootScene = new pvc.visual.Scene(null, {panel: this, group: data});
        
        data.children()
            .each(function(childData){
                var childScene = new pvc.visual.Scene(rootScene, {group: childData});
                childScene.acts.value = {
                    value: childData.value,
                    label: childData.label,
                    absLabel: childData.absLabel
            };
        });

        /* Add a last scene, with the same data group */
        var lastScene  = rootScene.lastChild;
        if(lastScene){
            var endScene = new pvc.visual.Scene(rootScene, {group: lastScene.group});
            endScene.acts.value = lastScene.acts.value;
        }

        return rootScene;
    }