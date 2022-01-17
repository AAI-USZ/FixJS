function(index, feature) {
           if(feature == selectedFeature)
                return;
           setAlpha(feature, viewedArea);
           var listResult = false;
           if(selectedFeature)
           {
               if(selectedFeature.geometry.CLASS_NAME == "OpenLayers.Geometry.Polygon")
               {
                   header = gettext('Things inside ') + selectedFeature.attributes.html + ':';
                   $.each(feature.geometry.getVertices(), function(ind, vertex){
                       if(selectedFeature.geometry.containsPoint(vertex))
                       {
                           listResult = true;
                           return false;
                       }
                   });
               } else {
                   var threshold = 500; // TODO: what units is this?
                   header = gettext('Things near ') + selectedFeature.attributes.html + ':';
                   listResult = selectedFeature.geometry.distanceTo(feature.geometry) < threshold;
                   if(feature.geometry.containsPoint)
                       listResult = listResult && !feature.geometry.containsPoint(selectedFeature.geometry);
               }
           }
           if(listResult || !selectedFeature)
           {
               var result = $('<li class="map_result">')
                            .html(feature.attributes.html)
                            .bind('mouseover', function (){
                                highlightResult(this, feature);
                            })
                            .bind('click', function (evt){
                                // hack to prevent olwidget from placing popup incorrectly
                                var mapSize = map.getSize();
                                var center = { x: mapSize.w / 2, y: mapSize.h / 2};
                                map.selectControl.handlers.feature.evt.xy = center;
                                map.selectControl.unselectAll();
                                map.selectControl.select(feature);
                            });
               results.append(result);
           }
        }