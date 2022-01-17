function(model){
	var that = this;
	this.model = model;
	this.view;
	
	this.searchEvents = function(filters) {
		if(filters==null) {
			that.view.visibleEvents = mainPlaylist;
			that.view.updateSearchResults()
		}
		else {
			if(filters.parameter_event!=null) {
				that.view.setEventVisible(mainPlaylist,false);
				that.view.setEventVisible(filters.parameter_event,true);
			}
		}
	}
}