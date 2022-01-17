function(){
				var vid = $( this )[0];
				vid.muted = true;
				vid.pause();
                connection.sendMessage({
                    videoOut: $(this).data('meta').identifier
                });
			}