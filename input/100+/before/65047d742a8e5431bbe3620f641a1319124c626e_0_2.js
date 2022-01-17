function(map)						// SET MAP STYLE

{

	var clearStyle=[

		{ featureType:"road", 	        elementType:"all",      stylers: [ { visibility:"off"} ] },

		{ featureType:"transit",        elementType:"all",      stylers: [ { visibility:"off"} ] },

		{ featureType:"poi",            elementType:"all",      stylers: [ { visibility:"off"} ] },

		{ featureType:"administrative", elementType:"all",      stylers: [ { visibility:"off"} ] },

		{ featureType:"landscape",      elementType:"all",      stylers: [ { visibility:"off"} ] },

		{ featureType:"all", 			elementType:"labels",   stylers: [ { visibility:"off"} ] },

		{ featureType:"all", 			elementType:"geometry", stylers: [ { lightness:-20}    ] }

		];

	var clearMap=new google.maps.StyledMapType(clearStyle,{name:"Land"});

	map.mapTypes.set("LAND",clearMap);

}