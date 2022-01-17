function loadVideoById(video_id) {
    var this_chan = cur_chan, video = findVideoById(this_chan, video_id);  //returns number typed
    if(video !== false){
	loadVideoList(this_chan);
        loadVideo(Number(video));
    }else{
        //ajax request
	var last_req = cur_vid_req;
	if(last_req !== null){
            last_req.abort();
	}
	
	cur_vid_req = $.ajax({
            url: "http://www.reddit.com/by_id/t3_"+video_id+".json",
	    dataType: "jsonp",
	    jsonp: "jsonp",
            success: function(data) {
                if(!isEmpty(data.data.children[0].data.media_embed)
                   && isVideo(data.data.children[0].data.media.type)
                  )
                {
                    videos[this_chan].video.splice(0,0,data.data.children[0].data);
                }
		loadVideoList(this_chan);
		loadVideo('first');
            },
            error: function(jXHR, textStatus, errorThrown) {
		if(textStatus !== 'abort'){
                    alert('Could not load data. Is reddit down?');
		}
            }
        });
    }
}