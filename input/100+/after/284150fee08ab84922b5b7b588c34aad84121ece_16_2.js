function(seriesScene){
                var group = data._childrenByKey[categKey];
                var seriesData1 = seriesScene.vars.series.value == null ? null : seriesScene.group;
                if(seriesData1){
                    group = group._childrenByKey[seriesData1.key];
                }
                
                var value = group ? group.dimensions(valueDim.name).sum(visibleKeyArgs) : null;
                var seriesInfo = {
                    data:   seriesData1,
                    group:  group,
                    value:  value,
                    isNull: value == null,
                    categ:  categInfo
                };
                
                seriesInfos.push(seriesInfo);
            }