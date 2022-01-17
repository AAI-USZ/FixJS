function pb_update(current, total) {

      if (previousTotal !== total) {
        style.width = (100 / total) + percentage;
        previousTotal = total;
      }

      style.MozTransform = 'translateX(' + current * 100 + '%)';
    }