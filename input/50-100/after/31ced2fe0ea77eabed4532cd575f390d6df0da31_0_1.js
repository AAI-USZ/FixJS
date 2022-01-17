function() {
             var $video = $(this),
                count = userCount[$video.data('meta').identifier] || 0;
             $video.data('userCount', count);
             _this.applyStyle(  count, Object.keys(users).length, $video );
         }