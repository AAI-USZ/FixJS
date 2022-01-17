function() {
	
//this.FillFavorites(this.FavoritesListModel);
this.FillIndexList(0, this.NearbyListModel); //Index 0 means Nearby markers
this.controller.modelChanged(this.NearbyListModel);
this.FillIndexList(1, this.MarkersListModel); //Index 1 means Markers
this.controller.modelChanged(this.MarkersListModel);

Mojo.Log.info("Favorites %j ", Favorites);	

	
	
}