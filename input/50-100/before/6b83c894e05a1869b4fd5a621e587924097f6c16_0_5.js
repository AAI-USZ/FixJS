function(e) {
      if (timerId !== 0) {
        clearInterval(timerId);
        timerId = 0;
        return $(this).css("color", "black");
      } else {
        $("#clear").click();
        timerId = setInterval(sparse, 50);
        return $(this).css("color", "red");
      }
    }