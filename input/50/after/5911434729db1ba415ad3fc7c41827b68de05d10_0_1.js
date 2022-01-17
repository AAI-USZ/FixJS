function(json){
	if(json && json.data){
		for(var i in json.data){
			this.addCity(json.data[i].name);
		}
		
		this.refreshCitiesView();
	}
}