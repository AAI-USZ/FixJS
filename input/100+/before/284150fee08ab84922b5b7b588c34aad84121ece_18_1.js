function(datum){
                /* Create leaf scene */
                var scene = new pvc.visual.Scene(seriesScene, {datum: datum});
                
                var atom = datum.atoms[chart._xDim.name];
                scene.acts.x = {
                    value: atom.value,
                    label: atom.label
                };
                
                atom = datum.atoms[chart._yDim.name];
                scene.acts.y = {
                    value: atom.value,
                    label: atom.label
                };
                
                if(getColorRoleValue){
                    scene.acts.color = {
                        value: getColorRoleValue(scene),
                        label: null
                    };
                }
                
                if(getDotSizeRoleValue){
                    var dotSizeValue = getDotSizeRoleValue(scene);
                    scene.acts.dotSize = {
                        value: dotSizeValue,
                        label: chart._dotSizeDim.format(dotSizeValue)
                    };
                }
                
                scene.isIntermediate = false;
                
                applyScales(scene);
            }