function(data) {
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
	    }