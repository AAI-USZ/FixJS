function() {

		if (this.TrafficVisibile == false) {
  		this.trafficLayer.setMap(this.map);
  		this.TrafficVisibile = true;
  		this.TrafficCookie.put(false);
  	} else {
  		this.trafficLayer.setMap(null);  //remove traffic layer
  		this.TrafficVisibile = false;
  		this.TrafficCookie.put(true);
  	};

}