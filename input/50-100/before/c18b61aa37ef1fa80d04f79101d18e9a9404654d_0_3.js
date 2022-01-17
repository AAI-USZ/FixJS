function(data) {
        mqjson = eval('(' + data + ')');
        mqcount = $(".health-mqsize-current");
        mqcount.html(mqjson.count);
        mqcount.fadeOut(200, function() {
          mqcount.fadeIn(200);
        });
      }