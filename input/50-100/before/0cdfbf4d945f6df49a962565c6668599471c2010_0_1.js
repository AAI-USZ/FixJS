function(){
        $('#photofeed').masonry({
          // options
          itemSelector : '.photo',
          columnWidth : 0,
          isAnimated: true,
          cornerStampSelector: '.corner-stamp',
          animationOptions: {
            duration: 150,
            easing: 'linear',
            queue: false
          }
        });

      }