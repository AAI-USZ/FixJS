function(childData){
                var childScene = new pvc.visual.Scene(rootScene, {group: childData});
                childScene.acts.value = {
                    value: childData.value,
                    label: childData.label,
                    absLabel: childData.absLabel
            };
        }