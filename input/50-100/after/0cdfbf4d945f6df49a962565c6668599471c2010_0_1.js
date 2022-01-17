function(){
        $('#photofeed').masonry({
          // options
          itemSelector : '.photo',
          columnWidth : 220,
          gutterWidth: 10,
          isAnimated: true,
          cornerStampSelector: '.corner-stamp',
          animationOptions: {
            duration: 50,
            easing: 'linear',
            queue: false
          }
        });

      }