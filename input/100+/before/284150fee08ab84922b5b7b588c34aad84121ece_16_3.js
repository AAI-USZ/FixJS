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
                scene.acts.category = {
                    value: categInfo.value,
                    label: categInfo.label
                };
                scene.acts[this.valueRoleName] = {
                    /* accumulated value, for stacked */
                    accValue: value != null ? value : orthoNullValue,
                    value:    value,
                    label:    valueDim.format(value)
                };
                
                scene.isInterpolatedMiddle = seriesInfo.isInterpolatedMiddle;
                scene.isInterpolated = seriesInfo.isInterpolated;
                scene.isNull = seriesInfo.isNull;
                scene.isIntermediate = false;
            }