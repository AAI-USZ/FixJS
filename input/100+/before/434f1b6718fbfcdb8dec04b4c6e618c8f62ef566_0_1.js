function( userId, user ){
			if( user.videoOver ){
				$('video').each(function(inx, video) {
             var v = $(video);
             if (v.data('meta').identifier == user.videoOver) {
                 v.data('userCount', (v.data('userCount') || 0) + 1);
                 _this.applyStyle(  v.data('userCount'), users.length, v );
             }
         });
			} else {
				 $('video').each(function(inx, video) {
	             var v = $(video);
	             if (v.data('meta').identifier == user.videoOver) {
	                 var userCount = Math.max((v.data('userCount') || 0) - 1, 0);
	                 v.data('userCount', userCount);
	             }
         });
	}
		}