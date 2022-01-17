function createSeriesScene(seriesGroup){
            /* Create series scene */
            var seriesScene = new pvc.visual.Scene(rootScene, {group: seriesGroup});
            
            seriesScene.vars.series = new pvc.visual.ValueLabelVar(
                                seriesGroup.value,
                                seriesGroup.label);
            
            seriesGroup.datums().each(function(datum){
                /* Create leaf scene */
                var scene = new pvc.visual.Scene(seriesScene, {datum: datum});
                
                var atom = datum.atoms[chart._xDim.name];
                scene.vars.x = new pvc.visual.ValueLabelVar(atom.value, atom.label);
                
                atom = datum.atoms[chart._yDim.name];
                scene.vars.y = new pvc.visual.ValueLabelVar(atom.value, atom.label);
                
                if(getColorRoleValue){
                    scene.vars.color = new pvc.visual.ValueLabelVar(
                                getColorRoleValue(scene),
                                "");
                }
                
                if(getDotSizeRoleValue){
                    var dotSizeValue = getDotSizeRoleValue(scene);
                    scene.vars.dotSize = new pvc.visual.ValueLabelVar(
                                            dotSizeValue,
                                            chart._dotSizeDim.format(dotSizeValue));
                }
                
                scene.isIntermediate = false;
                
                applyScales(scene);
            });
        }