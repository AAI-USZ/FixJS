function() {

		if (this.BikeVisibile == false) {
  		this.bikeLayer.setMap(this.map);
  		this.BikeVisibile = true;
  		this.Preferences.Bike = true;
		this.PrefsCookie.put(this.Preferences);
  	} else {
  		this.bikeLayer.setMap(null);  //remove bike layer
  		this.BikeVisibile = false;
  		this.Preferences.Bike = false;
		this.PrefsCookie.put(this.Preferences);
  	};

}