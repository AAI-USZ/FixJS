function() {
      elapsed++;
      remaining = limit - elapsed;
      $("#timer").html(function() {//display time
        return lpad(Math.floor(remaining / 60), 2) + ":" + lpad(remaining - (Math.floor(remaining / 60) * 60), 2);
      });
      if(remaining === 0) {//timer finished
        clearInterval(timer);
        $('#console').append('<li>Time out. You BOTH lose!</li>');
      }
    }