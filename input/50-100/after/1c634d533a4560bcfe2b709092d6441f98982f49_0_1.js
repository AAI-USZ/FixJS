function PlayListUpdate() {
	
	playlist = "";
	seperator = "-";
	
	$(".playList ul li").each(function() {
		
		playlist += $(this).attr("ref") + seperator;
	});
	playlist = playlist.substr(0,playlist.length-1);
	console.log(playlist);
	set_cookie("playlist",playlist);
}