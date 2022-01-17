function() {

var options;

		if (this.NightVisibile == false) {
		options = {
		styles: this.mapStyleNight[3]
		};
			this.map.setOptions(options);
  		//this.cloudLayer.setMap(this.map);
  		this.NightVisibile = true;
  		this.Preferences.Night = true;
		this.PrefsCookie.put(this.Preferences);
  	} else {
		options = {
		styles: null
		};
  		this.map.setOptions(options);
  		this.NightVisibile = false;
  		this.Preferences.Night = false;
		this.PrefsCookie.put(this.Preferences);
  	};

}