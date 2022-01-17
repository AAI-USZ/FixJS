function() {
      var box = $(this).find('.box');
      var time = box.clone();

      var message = "";
      var months = 0;
      var years = 0;
      var start = new Date(box.html().split("-")[0]);
      var end = new Date(box.html().split("-")[1]);

      // fix 'present' value
      end = end == "Invalid Date"? new Date(): end;

      // calculate the amount of months
      months = (end.getFullYear() - start.getFullYear()) * 12;
      months -= start.getMonth() + 1;
      months += end.getMonth() + 1;

      // calculate the amount of years
      years = months / 12;

      if (parseInt(years, 10) > 0) {
        message = years.toFixed(2) + ' years';
      } else {
        message = months + ' months';
      }

      time.hide();
      time.css({
        'width': box.width(),
        'position': 'relative',
        'right': -1 * box.innerWidth(),
        'textAlign': 'center'
      });
      time.html(message);

      box.stop();
      box.animate({opacity:0});
      box.after(time); // attach the human readable time

      time.fadeIn();
    }