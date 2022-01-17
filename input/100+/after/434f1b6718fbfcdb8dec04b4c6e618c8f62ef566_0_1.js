function(){
        var userCount = {};
		$.each( users, function( userId, user ){
			if( user.videoOver ){
                userCount[user.videoOver] = (userCount[user.videoOver] || 0) + 1;
            };
        });
		$('video').each(function() {
             var $video = $(this),
                count = userCount[$video.data('meta').identifier] || 0;
             $video.data('userCount', count);
             console.log(  count, Object.keys(users).length);
             _this.applyStyle(  count, Object.keys(users).length, $video );
         });
	}