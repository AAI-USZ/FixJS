function(){
				var vid = $( this )[0];
				vid.muted = true;
                connection.sendMessage({
                    videoOut: $(this).data('meta').identifier
                });
			}