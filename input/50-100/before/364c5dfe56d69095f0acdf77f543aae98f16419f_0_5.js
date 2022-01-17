function (i,e) {

                    var areaData = map_data.getDataForKey(e.toString());

                    addShapeGroupImpl(me,areaData, areaData.effectiveRenderOptions(mode));

                }