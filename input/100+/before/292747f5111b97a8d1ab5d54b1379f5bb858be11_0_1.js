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

        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20 }

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

    

    

    map.tripLayer = new OpenLayers.Layer.Vector("Trip Plans",{

    	strategies: [new OpenLayers.Strategy.Fixed()],

    	protocol: new OpenLayers.Protocol.HTTP({

    		url:"resources/data/tripPlans.json",

    		format: new OpenLayers.Format.GeoJSON( in_options )

    	})

    });

    

    

    

    map.arrivalLayer = new OpenLayers.Layer.Vector("Arrived",{

    	strategies: [new OpenLayers.Strategy.Fixed()],

    	protocol: new OpenLayers.Protocol.HTTP({

    		url:"resources/data/arrived.json",

    		format: new OpenLayers.Format.GeoJSON( in_options )

    	})

    });

    

//    map.arrivalLayer.style = window.map.theme1;

    

    map.addLayers( [ map.tripLayer, map.arrivalLayer] );



//    map.arrivalLayer.styleMap = window.map.mapTheme1;

    window.map.featureControlTripPlans = new OpenLayers.Control.SelectFeature(

    	map.tripLayer,

    	{

    		box: false,

    		clickout: true,

    		multiple:false,

    		toggle: true,

			onSelect: window.map.onTripPlansFeatureSelect,

			onUnselect: window.map.onFeatureUnselect

    	}

    );

    

    window.map.featureControlArrival = new OpenLayers.Control.SelectFeature(

    		map.arrivalLayer,

    		{

    			box:false,

    			clickout:true,

    			multiple:false,

    			toggle:true,

    			onSelect: window.map.onArrivedFeatureSelect,

    			onUnselect: window.map.onFeatureUnselect

    		}

    		);

    

    map.addControl(new OpenLayers.Control.LayerSwitcher());

    map.addControl( window.map.featureControlTripPlans );

    map.addControl( window.map.featureControlArrival );

    window.map.featureControlTripPlans.activate();

    window.map.featureControlArrival.activate();

    map.setCenter(new OpenLayers.LonLat(-114.01234,51.0235).transform("EPSG:4326","EPSG:900913"), 7);



    window.map.styleTripPlansFeatures();

    window.map.styleArrivedFeatures();

}