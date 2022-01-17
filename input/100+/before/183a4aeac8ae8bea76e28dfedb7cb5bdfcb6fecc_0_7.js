function(maploc) {

	if (this.maploc == undefined) { //this occurs when the app is relanuching with parameter
		this.maploc = maploc;
		this.maploc = this.maploc.replace(/%20/gi,' '); //replaces all the %20 to spaces
		this.maploc = this.maploc.replace(/%2C/gi,','); //replaces all the %2C to commas
		google.maps.event.trigger(this.map, "idle");
	};

	if (this.maploc != undefined) {
		this.maploc = this.maploc.replace(/%20/gi,' '); //replaces all the %20 to spaces
		this.maploc = this.maploc.replace(/%2C/gi,','); //replaces all the %2C to commas
		Mojo.Log.info("*** LAUNCH MAPLOC PLACES ***", this.maploc);
	};

}