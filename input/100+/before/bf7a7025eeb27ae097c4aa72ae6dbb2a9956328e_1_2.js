function(){
        
    connection = new Strophe.Connection(BOSH_SERVICE);
    connection.rawInput = rawInput;
    connection.rawOutput = rawOutput;

    handlerid = connection.addHandler(function(stnz){
        console.log("GOT SOMETHING"+ stnz);
        return true;
    });
    connection.connect("guest.talkback.im",
			           "",
			           onConnect);
    

    
    $("#message").keyup(function(e){
        console.log("keypress: ", e);
        if(e.which == 13){
            talkback.sendRoomMessage($("#message").val());
            $("#message").val("");
        }   
    });
    $("#sendmessage").click(function(){
        talkback.sendRoomMessage($("#message").val());
        $("#message").val("");

    });
    $('#tabs').tab('show');
    $('a[data-toggle="tab"]').on('shown', function (e) {
        if($(e.target).attr("id") == "modepolyline"){
            maptalk.mode="edit";
            maptalk.edit_type="polyline";           
            $("a.dropdown-toggle span").text("Mode: Edit - Line");
        }else if($(e.target).attr("id") == "modepoint"){
            maptalk.mode="edit";
            maptalk.edit_type="point";           
            $("a.dropdown-toggle span").text("Mode: Edit - Point");
        }else if($(e.target).attr("id") == "modeview"){
            maptalk.mode="view";
            maptalk.edit_type="";           
            $("a.dropdown-toggle span").text("Mode: View");
        }
    });

    // Define the map to use from MapBox
    // This is the TileJSON endpoint copied from the embed button on your map
    var url = 'http://a.tiles.mapbox.com/v3/dmt.map-cdkzgmkx.jsonp';

    // Make a new Leaflet map in your container div
    map = new L.Map('map', {zoomControl:false})  

    // Center the map on Washington, DC, at zoom 15
    .setView(new L.LatLng(43.059, -73.022), 12);

    // Get metadata about the map from MapBox
    wax.tilejson(url, function(tilejson) {
        // Add MapBox Streets as a base layer
        map.addLayer(new wax.leaf.connector(tilejson));
    });


    if(navigator.geolocation) {
//        $('a#findme').click(function(){           
        navigator.geolocation.getCurrentPosition(function(position) {
            var browserLoc = new L.LatLng(position.coords.latitude,position.coords.longitude);
            map.panTo(browserLoc);
        });
//        });
    }else{
        $("a#findme").parent("li").hide();
    }

    map.on("click", function(e){
        
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
    });

    map.on("moveend", function(e){
        talkback.pubsubSubscribe();
    });

    maptalk.init();

}