function(){
      // Update current throughput every 5 seconds
      $.post("/health/currentthroughput", function(data) {
        json = eval('(' + data + ')');
        count = $(".health-throughput-current");
        count.html(json.count);
        count.fadeOut(200, function() {
          count.fadeIn(200);
        });
      });
  
      // Update message queue size every 5 seconds
      $.post("/health/currentmqsize", function(data) {
        mqjson = eval('(' + data + ')');
        mqcount = $(".health-mqsize-current");
        mqcount.html(mqjson.count);
        mqcount.fadeOut(200, function() {
          mqcount.fadeIn(200);
        });
      });
    }