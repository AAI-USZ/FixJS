function pb_update(current, total) {

      if (previousTotal !== total) {
        style.width = (100 / total) + '%';
        previousTotal = total;
      }

      if (document.documentElement.dir == 'rtl') {
        style.MozTransform = 'translateX(-' + current * 100 + '%)';
      } else {
        style.MozTransform = 'translateX(' + current * 100 + '%)';
      }
    }