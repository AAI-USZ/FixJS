function addToPlayList(ref) {
	
	seperator = "-";
	
	if (playlist == "") {
		
		seperator = "";
	}
	playlist += seperator + ref;
	set_cookie("playlist",playlist);
}