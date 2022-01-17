function createCategScene(categInfo){
                var seriesInfo = categInfo.seriesInfos[seriesIndex];
                var group = seriesInfo.group;
                var value = seriesInfo.value;
                
                /* If there's no group, provide, at least, a null datum */
                var datum = group ? 
                            null : 
                            createNullDatum(
                                    seriesInfo.data || seriesScene.group, 
                                    categInfo.data  );
                
                // ------------
                
                var scene = new pvc.visual.Scene(seriesScene, {group: group, datum: datum});
                scene.vars.category = new pvc.visual.ValueLabelVar(categInfo.value, categInfo.label);
                
                var valueVar = new pvc.visual.ValueLabelVar(
                                    value, 
                                    valueDim.format(value));
                
                /* accumulated value, for stacked */
                valueVar.accValue = value != null ? value : orthoNullValue;
                
                scene.vars.value = valueVar;
                
                scene.isInterpolatedMiddle = seriesInfo.isInterpolatedMiddle;
                scene.isInterpolated = seriesInfo.isInterpolated;
                scene.isNull = seriesInfo.isNull;
                scene.isIntermediate = false;
            }