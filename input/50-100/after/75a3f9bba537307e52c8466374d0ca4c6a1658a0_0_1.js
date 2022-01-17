function(data) {
			  	var videoDiv = $("#video-player");
			  	if (data.length > 0) {	
			  		player.src(data[0].high);
			  		$("#q3").fadeOut("fast", function() {
			  			$("#q3").after(videoDiv);
			  			videoDiv.fadeIn("slow");
			  		});
			  	}
			  	else {
			  		alert('no videos found');
			  	}
		    }