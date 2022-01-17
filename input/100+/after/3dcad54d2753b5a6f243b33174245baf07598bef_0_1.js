function(options) {
    $.extend(settings, options);

    canvas = document.createElement('canvas');
    img    = document.createElement('img');
    link   = document.getElementById('favicon').cloneNode(true);

    if(canvas.getContext) {
      canvas.height = canvas.width = 16; // set the size
      ctx = canvas.getContext('2d');

      img.onload = function() {
        drawFavicon(1);
      };
    }

    $(document).bind('timer_start', function() {
      drawFavicon(0);
    }).bind('timer_tick', function(event, timer, duration) {
      drawFavicon(timer/duration);
    }).bind('timer_stop', function() {
      drawFavicon(1);
    });

    img.src = '/public/tomatoes-icon.png';
  }