function() {

		if (this.CloudVisibile == false) {
  		this.cloudLayer.setMap(this.map);
  		//the cloud layer is visible only on zoom lower than 6
  		if (this.map.getZoom() > 6) this.map.setZoom(6);
  		this.CloudVisibile = true;
  		this.Preferences.Cloud = true;
		this.PrefsCookie.put(this.Preferences);
  	} else {
  		this.cloudLayer.setMap(null);  //remove bike layer
  		this.CloudVisibile = false;
  		this.Preferences.Cloud = false;
		this.PrefsCookie.put(this.Preferences);
  	};

}