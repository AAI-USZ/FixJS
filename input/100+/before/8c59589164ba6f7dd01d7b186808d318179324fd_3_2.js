function(model) {
	for(var i=0,j=restaurantNames.length; i<j; i++){
	  model.pushRestaurant(new restaurant(restaurantNames[i]).pushEvent(sportevents[i%2]));
	};
}