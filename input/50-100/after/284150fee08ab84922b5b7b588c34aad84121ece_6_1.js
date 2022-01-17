function(childData){
                var childScene = new pvc.visual.Scene(rootScene, {group: childData});
                var valueVar = 
                    childScene.vars.tick = 
                        new pvc.visual.ValueLabelVar(
                                    childData.value,
                                    childData.label);
                
                valueVar.absLabel = childData.absLabel;
        }