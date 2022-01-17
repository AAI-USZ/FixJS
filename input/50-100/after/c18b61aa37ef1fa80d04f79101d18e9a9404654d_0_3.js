function(json) {
        mqcount = $(".health-mqsize-current");
        mqcount.html(json.count);
        mqcount.fadeOut(200, function() {
          mqcount.fadeIn(200);
        });
      }