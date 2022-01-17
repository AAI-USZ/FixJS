function(e){
        
        if(maptalk.mode=="edit"){

            if(maptalk.edit_type=="point"){
                var marker = new L.Marker(e.latlng, {draggable:true, featureid:Math.floor(Math.random()*10000).toString()});
                map.addLayer(marker);

                maptalk.sendMapChange({id:marker.options.featureid, 
                                       type:"point"}, [e.latlng.lat, e.latlng.lng], "addition");
                marker.on("dragend", maptalk.markerDragend);
                maptalk.features.push(marker);

            }else if(maptalk.edit_type == "polyline"){
                var polyline = null;
                if(maptalk.editing_feature != null){
                    polyline = maptalk.editing_feature;
                    polyline.addLatLng(e.latlng);
                }else{
                    polyline = new L.Polyline([e.latlng], 
                                              {color: maptalk.getFeatureColor(), 
                                               featureid:Math.floor(Math.random()*10000).toString()});
                    maptalk.editing_feature = polyline;
                    polyline.on("click", function(e){
                        if(maptalk.editing_feature != null){
                            // we are currently editing.
                            if(maptalk.editing_feature.options.featureid == e.target.options.featureid){
                                //stop editing
                                maptalk.editing_feature = null;
                                maptalk.mode="view";
                                maptalk.edit_type="";           
                                $("a.dropdown-toggle span").text("Mode: View");
                                $("ul.dropdown-menu li").removeClass("active");
                                $("a#modeview").parent("li").addClass("active");

                            }                            
                        }else{
                            // start editing...
                        }
                        

                    });
                    maptalk.features.push(polyline);
                }

                maptalk.sendMapChange({id:polyline.options.featureid, 
                                       type:"polyline"}, [e.latlng.lat, e.latlng.lng], "addition");

                map.addLayer(polyline);

            }
        }
    }