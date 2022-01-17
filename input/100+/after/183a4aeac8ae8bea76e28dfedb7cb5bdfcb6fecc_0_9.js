function() {

		if (this.TrafficVisibile == false) {
		this.setStatusPanel($L("Show") + " " + $L("Traffic") + "...", 2);
  		this.trafficLayer.setMap(this.map);
  		this.TrafficVisibile = true;
  		this.TrafficCookie.put(false);
  	} else {
		this.setStatusPanel(($L("Hide") + " " + $L("Traffic") + "..."), 2);
  		this.trafficLayer.setMap(null);  //remove traffic layer
  		this.TrafficVisibile = false;
  		this.TrafficCookie.put(true);
  	};

}