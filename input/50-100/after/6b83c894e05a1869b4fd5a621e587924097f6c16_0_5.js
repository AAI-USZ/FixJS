function(e) {
      if (timer.isOn) {
        timer.off();
        return $(this).css("color", "black");
      } else {
        timer.on();
        return $(this).css("color", "red");
      }
    }