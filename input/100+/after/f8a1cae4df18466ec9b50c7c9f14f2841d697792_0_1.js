function loadLocations(){

	var locationArray = $.evalJSON(localStorage.getItem("locArray"));

	

	var locationsList = $("#locations").find(".locationsList");

	locationsList.empty();

	

	var topLocationsNotSet = true;

	var result = '<li data-role="list-divider" role="heading">Top locaties</li>';

	

	for (i=0; i<locationArray.length; i++){

		

		 var location = $.evalJSON(localStorage.getItem(locationArray[i].location));

		

		if(location.topLocation && topLocationsNotSet){

			result += '<li data-role="list-divider" role="heading" class="ui-li ui-li-divider ui-bar-b">Overige locaties</li>';

			topLocationsNotSet = false;

		}

		

		var id = location.id;

		var text = location.text;

		

		result += '<li id="location-'+id+'" data-corners="false" data-shadow="false" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-count ui-li-has-thumb ui-btn-up-c">';

    	result += '<div class="ui-btn-inner ui-li">';

    	result += '<a href="#detail?id='+id+'" class="ui-link-inherit" data-transition="slide">';

    	result += '<img src="http://jquerymobile.com/test/docs/lists/images/album-bb.jpg" class="ui-li-thumb">';

    	result += '<h3 class="ui-li-heading">'+location.name+'</h3>';

    	result += '<p class="ui-li-desc">'+location.street+', '+location.city+'</p>';

    	result += '<span class="ui-li-count ui-btn-up-c ui-btn-corner-all" style="display: none;"></span>';

    	result += '</a>';

    	result += '<span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span>';

    	result += '</div">';

    	result += '</li>';

    	

    	location.visited = false;

	}

	

	locationsList.append(result);

	locationsList.listview("refresh");

}