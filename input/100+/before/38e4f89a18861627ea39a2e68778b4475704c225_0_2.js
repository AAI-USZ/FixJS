function loadChannel(channel, video_id) {
    var last_req = cur_chan_req;
    if(last_req != null){
	last_req.abort();
    }

    var this_chan = getChan(channel);
    cur_chan = this_chan;
    $('#video-list').stop(true, true).animate({ height:0, padding:0 }, 500, function() {
	$(this).empty().hide();
    });
    $('#prev-button,#next-button').css({ 'visibility':'hidden', 'display':'none' });
    $('#vote-button').empty();
    $('#video-source').empty();

    var $video_embed = $('#video-embed');
    var $video_title = $('#video-title');

    $video_title.html('Loading '+channels[this_chan].feed.slice(0,-5)+' ...');
    $video_embed.addClass('loading');
    $video_embed.empty();
    
    $('#channel-list>ul>li').removeClass('chan-selected');
    $('#channel-'+this_chan).addClass('chan-selected');

    if(videos[this_chan] == undefined){
	var feed = getFeedName(channel);
	cur_chan_req = $.ajax({
	    url: "http://www.reddit.com"+feed+"?limit=100",
	    dataType: "jsonp",
	    jsonp: "jsonp",
	    success: function(data) {
		videos[this_chan] = new Object;
		videos[this_chan].video = new Array(); //clear out stored videos
		for(var x in data.data.children){
                    if(!isEmpty(data.data.children[x].data.media_embed)
                       && isVideo(data.data.children[x].data.media.type)
                      )
                    {
			videos[this_chan].video.push(data.data.children[x].data);
                    }
		}

		if(video_id != null){
		    loadVideoById(video_id);
		}else{
		    loadVideoList(this_chan);
		    cur_video = 0;
		    loadVideo('first');
		}
	    },
	    error: function(jXHR, textStatus, errorThrown) {
		if(textStatus != "abort"){
		    alert('Could not load feed. Is reddit down?');
		}
	    }
	});
    }else{
	if(video_id != null){
            loadVideoById(video_id);
        }else{
	    loadVideoList(this_chan);
	    cur_video = 0;
	    loadVideo('first');
	}
    }
}