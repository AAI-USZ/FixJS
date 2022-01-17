function(video) {
             var v = $(video);
             if (v.data('meta').identifier == user.videoOver) {
                 var userCount = Math.max((v.data('userCount') || 0) - 1, 0);
                 v.data('userCount', userCount);
             }
         }