function() {
	
		this.LoadingSpinner("stop");
		//this.ActualCenter = this.map.getCenter();
		(function(){
					this.ActualCenter = this.map.getCenter();
					this.CenterChanged = true; //for sure if bounds_changed fails, the map was unmovable
					//Mojo.Log.info("ActualCenter IDLE: ", this.ActualCenter);
				}).bind(this).delay(1);
		//Mojo.Log.info("ActualCenter IDLE: ", this.ActualCenter);


		// for Just type integration, call search after map idle
		if (this.maploc != undefined) { //this occurs when the app is relanuching with parameter
			this.Search(this.maploc);
			this.maploc = undefined;
		};
		
		if(this.wasflicked && this.isPre3()) {
			this.wasflicked = false;
			this.Pre3Refresh();	
		};
		//Mojo.Log.info("IDLE: ");
	

}