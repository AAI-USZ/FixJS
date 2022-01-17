function(video) {
             var v = $(video);
             if (v.data('meta').identifier == user.videoOver) {
                 v.data('userCount', (v.data('userCount') || 0) + 1);
                 _this.applyStyle(  v.data('userCount'), users.length, v );
             }
         }