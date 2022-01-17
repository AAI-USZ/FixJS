function(doneCallback, context){
	
	if(!this.cities[this.selectedCity].loaded){
		var cityClosure = this.selectedCity;
		$.ajax(OSMHell.API_URL, {
			data: {'action':'addrselect', 'get' : 'street', 'city' : this.selectedCity},
			context : window.osmhell
		}).done(function ( data ) {
			this.applyStreets($.parseJSON(data), cityClosure);
			this.refreshStreetsView();
			
			if(doneCallback){
				doneCallback.apply(context, []);
			}
		});
	} else {
		this.refreshStreetsView();
		
		if(doneCallback){
			doneCallback.apply(context, []);
		}
	}
	
	
}