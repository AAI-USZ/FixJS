function(){

	

	

	// the map is an OpenLayers map object.

    var map = new OpenLayers.Map('map',{

    	projection:"EPSG:900913",

    	displayProjection:"EPSG:4326", // setting what projection the mouse coordinates will be, but 900913 is actually spherical mercator.

    	numZoomLevel: 18

    });

    window.map.Map = map;

    

  

   

    

    var gphy = new OpenLayers.Layer.Google(

        "Google Physical",

        {

        	type: google.maps.MapTypeId.TERRAIN

        }

    );

    

    

    var gmap = new OpenLayers.Layer.Google(

        "Google Streets", // the default

        {

        	sphericalMercator:true,

        	displayInLayerSwitcher: true,

        	isBaseLayer:true

        }

    );

    var ghyb = new OpenLayers.Layer.Google(

        "Google Hybrid",

        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 22,

        	resolutions: [156543.03390625, 78271.516953125, 39135.7584765625,

                          19567.87923828125, 9783.939619140625, 4891.9698095703125,

                          2445.9849047851562, 1222.9924523925781, 611.4962261962891,

                          305.74811309814453, 152.87405654907226, 76.43702827453613,

                          38.218514137268066, 19.109257068634033, 9.554628534317017,

                          4.777314267158508, 2.388657133579254, 1.194328566789627,

                          0.5971642833948135, 0.25, 0.1, 0.05]}

    );

    var gsat = new OpenLayers.Layer.Google(

        "Google Satellite",

        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}

    );



   

    // add base layer 

    map.addLayers([ ghyb ]);

    

    var in_options = {

            'internalProjection': map.baseLayer.projection,

            'externalProjection': "EPSG:4326"

        }; 

    

    

    window.map.tripLayer = new OpenLayers.Layer.Vector("Trip Plans",{

    	strategies: [new OpenLayers.Strategy.Fixed()],

    	protocol: new OpenLayers.Protocol.HTTP({

    		url:"resources/data/tripPlans.json",

    		format: new OpenLayers.Format.GeoJSON( in_options )

    	}),

    	eventListeners:{

    		"featureselected":function(evt){

    			window.map.selectedTripPlansFeature = evt.feature;

    			var feature = evt.feature;

    			var linkRow;

    			if( feature.attributes["linkType"] === utils.linkType.wikipedia){

    				linkRow = "<tr><th class='strong'>link:</th><td><a href=\""+feature.attributes["link"]+"\"><img src=\"resources/img/wikipedia_icon.png\" alt=\"wikipedia\"/></a></td></tr>";

    			}else if( feature.attributes["linkType"] === utils.linkType.website){

    				linkRow = "<tr><th class='strong'>link:</th><td><a href=\""+feature.attributes["link"]+"\"><img src=\"resources/img/IE_icon.png\" alt=\"wikipedia\"/></a></td></tr>";

    			}else{

    				linkRow = "<tr><th class='strong'></th><td></td></tr>";

    			}

    			var popup = new OpenLayers.Popup.FramedCloud( feature.id, feature.geometry.getBounds().getCenterLonLat(), null, 

    					"<table>"+

    					"<tr><th class='strong'>interested in:</th><td>"+feature.attributes["interest"]+"</td></tr>"+

    					"<tr><th class='strong'>Goal:</th><td>"+feature.attributes["forPhil"]+"</td></tr>"+

    					linkRow+

    					"</table>", null, true, map.onPopupClose

    			);

    			popup.panMapIfOutOfView = true;

    			feature.popup = popup;

    			map.addPopup( popup );

    		},

    		

    		"featureunselected":function(evt){

    			if( evt !== null){

    				window.map.selectedTripPlansFeature = null;

    				var feature = evt.feature;

    				if( feature ){

    					map.removePopup( feature.popup );

    					feature.popup.destroy();

    					feature.popup = null;

    				}

    			}

    		},

    		"featuresadded":function(evt){

    			var addedFeatures = evt.features;

    			var wMap = window.map;

    			wMap.features.concat( addedFeatures );

    			for( var i = 0; i<addedFeatures.length; i++ ){

    				if( !wMap.bounds ){

        				wMap.bounds = addedFeatures[i].geometry.getBounds();

        			}else{

        				wMap.bounds.extend( addedFeatures[i].geometry.getBounds());

        			}

    			}

    			

    			map.zoomToExtent( wMap.bounds );

    		}

    	}

    });

    

    

    

    window.map.arrivalLayer = new OpenLayers.Layer.Vector("Arrived",{

    	strategies: [new OpenLayers.Strategy.Fixed()],

    	protocol: new OpenLayers.Protocol.HTTP({

    		url:"resources/data/arrived.json",

    		format: new OpenLayers.Format.GeoJSON( in_options )

    	}),

    	eventListeners:{

    		"featureselected":function(evt){

    			window.map.selectedArrivedFeature = evt.feature;

    			var feature = evt.feature;

    			var popup = new OpenLayers.Popup.FramedCloud( feature.id, feature.geometry.getBounds().getCenterLonLat(), null, 

    					"<p>"+feature.attributes["forPhil"]+"</p>", null, true, map.onPopupClose,

    					{

    						closeOnMove:true

    					}

    				);

    			popup.panMapIfOutOfView = true;

    			feature.popup = popup;

    			map.addPopup( popup );

    		},

    		"featureunselected":function(evt){

				if( evt !== null){

					window.map.selectedArrivedFeature = null;

					var feature = evt.feature;

					if( feature ){

						map.removePopup( feature.popup );

						feature.popup.destroy();

						feature.popup = null;

					}

				}

    		},

    		"featuresadded":function(evt){

    			var addedFeatures = evt.features;

    			var wMap = window.map;

    			wMap.features.concat( addedFeatures );

    			for( var i = 0; i<addedFeatures.length; i++ ){

    				if( !wMap.bounds ){

        				wMap.bounds = addedFeatures[i].geometry.getBounds();

        			}else{

        				wMap.bounds.extend( addedFeatures[i].geometry.getBounds());

        			}

    			}

    			map.zoomToExtent( wMap.bounds );

    		}

    	}

    });



    map.addLayers( [ window.map.tripLayer, window.map.arrivalLayer] );



    window.map.featureControl = new OpenLayers.Control.SelectFeature(

    		[ window.map.tripLayer, window.map.arrivalLayer],

    		{

    			box:false,

    			clickout:true,

    			multiple:false,

    			toggle:true

    		}

    );

    

    map.addControl(new OpenLayers.Control.LayerSwitcher());

    map.addControl( window.map.featureControl );

    window.map.featureControl.activate();

//    map.setCenter(new OpenLayers.LonLat(-114.01234,51.0235).transform("EPSG:4326","EPSG:900913"), 7);



    window.map.styleTripPlansFeatures();

    window.map.styleArrivedFeatures();

}