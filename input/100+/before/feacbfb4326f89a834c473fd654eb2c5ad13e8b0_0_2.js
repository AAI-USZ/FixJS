function(){
		// bind each video, as well as set up globals
		_this.$target.find('.videowall video')
		.each( function( inx, curentVideo ){
			// make sure the base volume is zero
			$( curentVideo )[0].muted = true;
			// make base opacity .5
			$( curentVideo ).css( 'opacity', '.5');
		})
		.hoverIntent({
			'over': function(){
				var vid = $( this )[0];
				vid.play();
				vid.muted = false;
				
                connection.sendMessage({
                    videoOver: $(this).data('meta').identifier
                });
			},
			'out': function(){
				var vid = $( this )[0];
				vid.muted = true;
				vid.pause();
                connection.sendMessage({
                    videoOut: $(this).data('meta').identifier
                });
			}
		});
	}