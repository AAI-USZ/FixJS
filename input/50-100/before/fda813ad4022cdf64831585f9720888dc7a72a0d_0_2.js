function(data) {
        json = eval('(' + data + ')');
        count = $(".health-throughput-current");
        count.html(parseInt(parseInt(json.count)/5)); // /5, because this is the 5 second sum and we want only the 1 second average
        count.fadeOut(200, function() {
          count.fadeIn(200);
        });
      }