function() {

		if (this.WeatherVisibile == false) {
  		this.weatherLayer.setMap(this.map);
  		//the weather is visible only on zoom lower than 12
  		if (this.map.getZoom() > 12) this.map.setZoom(12);
  		this.WeatherVisibile = true;
  		this.Preferences.Weather = true;
		this.PrefsCookie.put(this.Preferences);
  	} else {
  		this.weatherLayer.setMap(null);
  		this.WeatherVisibile = false;
  		this.Preferences.Weather = false;
		this.PrefsCookie.put(this.Preferences);
  	};

}