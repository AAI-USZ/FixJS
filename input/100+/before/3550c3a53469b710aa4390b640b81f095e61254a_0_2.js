function(doneCallback, contex){
	
	if(!this.cities[this.selectedCity].streets[this.selectedStreet].loaded){
		var cityClosure = this.selectedCity;
		var streetClosure = this.selectedStreet;
		$.ajax(OSMHell.API_URL, {
			data: {'action':'addrselect', 'get' : 'house', 'city' : this.selectedCity, 'street' : this.selectedStreet},
			context : window.osmhell
		}).done(function ( data ) {
			this.applyBuildings($.parseJSON(data), cityClosure, streetClosure);
			this.refreshBuildingsView();
			
			if(doneCallback){
				doneCallback.apply(contex, []);
			}
		});
	} else {
		this.refreshBuildingsView();
		
		if(doneCallback){
			doneCallback.apply(contex, []);
		}
	}
	
}