function(afterLoadingRoutine) {
	// fetch all data for the local configuration
	this.fetchDataSetsFromServer("localhost", null,  afterLoadingRoutine);
}