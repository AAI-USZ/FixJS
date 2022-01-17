function(){
	var newSelection = $(this).children("a").attr("data-tab-class");
	$("."+prevSelectionFilter).addClass("ui-screen-hidden");
	$("."+newSelection).removeClass("ui-screen-hidden");
	if(newSelection == "tab1_filter") {
		$('#map_canvas_route_search_results_filtered').gmap(mapCenter);
		$('#map_canvas_route_search_results_filtered').gmap('option', 'zoom', mapZoom);
		$('#map_canvas_route_search_results_filtered').gmap('addMarker', mapCenterMarker );
		$('#map_canvas_route_search_results_filtered').gmap('displayDirections',
			{
				'origin': '51.521428,-0.071754',
				'destination': '51.521428,-0.071754',
				'waypoints': [
					{ "location": '51.522483,-0.070157' },
					{ "location": 'Weavers Community Space 15 Kelsey St, London, UK E2 6HD' },
					{ "location": 'Tas Firin Restaurant, 160 Bethnal Green Road, City of London, London, Greater London E2 6DG' },
					{ "location": 'Elemental - Antiques, 67 Brushfield Street, City of London, London, Greater London E1 6AA' },
					{ "location": '51.521849,-0.067776' }
				],
				'travelMode': google.maps.DirectionsTravelMode.WALKING
			},
			{},
			function(result, status) {}
		);
	}
	prevSelectionFilter = newSelection;
}