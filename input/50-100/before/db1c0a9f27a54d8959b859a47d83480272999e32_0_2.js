function(data) {
        json = eval('(' + data + ')');
        count = $(".health-throughput-current");
        count.html(json.count);
        count.fadeOut(200, function() {
          count.fadeIn(200);
        });
      }