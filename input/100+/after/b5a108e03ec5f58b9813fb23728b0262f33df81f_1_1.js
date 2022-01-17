function() {

	$('#detail').live('pagebeforeshow', function(event, ui) {

		if(supports_local_storage()){

			//if the browser if capable of localStorage load cached information

			loadLocation($.mobile.pageData.id);

		}else{

			//TODO: ASK DB

		}		

		

	});

	

	// ask location permission on first screen

	$('#home').live('pageshow', function(event, ui) {

		// if (navigator.geolocation)

		// navigator.geolocation.getCurrentPosition(displayLocation,

		// displayError);

		$('[data-role=content]').height('100%');

	});

	

	$("#map").live("pagebeforeshow", function(event, ui) {		

		//$("#map_canvas").gmap({'callback' : function() {

				if (navigator.geolocation)

					 navigator.geolocation.getCurrentPosition(displayCurrentLocation, displayError);

			//}

		//});

		

		//set map height

		$('[data-role=content]').height($(window).height() - (42 + $('[data-role=header]').last().height()));

		

		ziedelft.webdb.getAllLocations(setMarkers);

		//drawPolyLine(monuments);

		//$("#map_canvas").gmap("refresh");

	});

	

	$("#map").live("pageshow", function(event, ui) {

		$("#map_canvas").gmap("refresh");

	});

	

	$("#locations").live("pagebeforeshow", function(event, ui) {

		loadLocations();

		//ziedelft.webdb.getAllLocations(loadLocations);

		//console.log("loaded Locations");

		if (navigator.geolocation){

			console.log("found gps");

			navigator.geolocation.getCurrentPosition(calculateDistancesTo, displayError);

		}

	});

	

	$("#social").live("pagebeforeshow", function(event, ui) {

		loadTweets('#f1');

	});



}