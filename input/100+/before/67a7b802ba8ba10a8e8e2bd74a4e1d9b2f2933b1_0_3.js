function getNextVideoFromPlaylist() {
	
	video_ids = playlist.split("-");
	next_video_id = null;
	
	next_video = false;
	
	if (current_video == null) {
		
		next_video_id = video_ids[0];
		next_video = true;
	}
	else {
		
		for(var i=0; i<video_ids.length; i++) {
			
			if (video_ids[i] == current_video) {
				
				if (video_ids[i+1] != undefined) {
					
					next_video_id = video_ids[i+1];
					next_video = true;
				}
				continue;
			}
		}
	}
	
	if (next_video) {
		
		current_video = next_video_id;
		
		$.ajax({
								
			type: "POST",
			data: "action=getVideoUrlById&id=" + next_video_id,
			async: false,
			url: "php/AjaxController.php",
			success: function(data) {
				
				return_value = data;
			}
		});
	}
	else {
		return_value = null;
	}
	return return_value;
}