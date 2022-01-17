function parseLocations(locations){

	localStorage.setItem("locArray","");	

	var locationArray = $.evalJSON($.toJSON([]));



	for (i=0; i<locations.length; i++){

    	

    	locations[i].visited = false;

    	

    	var key = 'loc-'+locations[i].id;

    	localStorage.setItem(key,$.toJSON(locations[i]));

    	

    	locationArray[i]={location : key, topLocation : locations[i].topLocation};



		}

	

	localStorage.setItem("locArray",$.toJSON(locationArray));	

}