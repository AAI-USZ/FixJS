function() {

var options;

		if (this.NightVisibile == false) {
		options = {
		styles: this.mapStyleNight[3]
		};
		this.setStatusPanel($L("Enable") + " " + $L("Night") + "...", 2);
		this.map.setOptions(options);
  		this.NightVisibile = true;
  		this.Preferences.Night = true;
		this.PrefsCookie.put(this.Preferences);
  	} else {
		options = {
		styles: null
		};
		this.setStatusPanel($L("Disable") + " " + $L("Night") + "...", 2);
  		this.map.setOptions(options);
  		this.NightVisibile = false;
  		this.Preferences.Night = false;
		this.PrefsCookie.put(this.Preferences);
  	};

}