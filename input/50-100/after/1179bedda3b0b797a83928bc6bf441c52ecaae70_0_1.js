function() {
    	var title = strip($(this).find('.info li:nth-child(2)').html());
        title = title.replace("Song: ","");
    	var artist = $(this).find(".bucketblock h4").text();
		Playgrub.playlist.add_track(artist,title);
    }