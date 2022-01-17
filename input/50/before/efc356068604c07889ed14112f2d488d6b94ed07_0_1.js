function() {

	// gets the user's location and sets up the map
	APP.setupMap();

	// retrieve the songs
	APP.getSongs();

	// retrieve playlists (only returns something if
	// this is for a logged in user)
	APP.getPlaylists();

	// setup the function handlers
	HANDLERS.functions.setup();
}