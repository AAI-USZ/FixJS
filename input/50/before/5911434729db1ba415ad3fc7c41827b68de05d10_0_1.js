function(json){
	if(json && json.rows){
		for(var i in json.rows){
			this.addCity(json.rows[i].name);
		}
		
		this.refreshCitiesView();
	}
}