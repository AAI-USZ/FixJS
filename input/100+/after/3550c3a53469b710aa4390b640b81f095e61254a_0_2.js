function(doneCallback, contex){
	
	if(!this.cities[this.selectedCity].streets[this.selectedStreet].loaded){
		
		var cityClosure = this.selectedCity;
		var streetClosure = this.selectedStreet;
		loadData({'action':'addrselect', 'get' : 'house', 'city' : this.selectedCity, 'street' : this.selectedStreet}, window.osmhell, function(data){
			this.refreshBuildingsDataCallback(data, cityClosure, streetClosure);
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