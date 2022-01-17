function updatePosition(col, newDigit, oldDigit) {
      if (isNaN(newDigit) || isNaN(oldDigit))
        return this;

      if (newDigit != oldDigit) {
        col.stop();
        // if the number is 0 use the bottom 0 in the image, and change intantly to the top 0
        if (newDigit == 0) {
          col.animate({
            top: (10 * settings.heightNumber * -1) + zeroSet
          }, settings.speed, settings.easing).animate({
            top: zeroSet
          }, 1, 'linear');
        } else {
          // if the new number is lower than the old, we have to go to the bottom 0 
          // and start from the top 0, with the apropiate speed, to don't note the jump
          if (newDigit < oldDigit) {
            col.animate({
              top: (10 * settings.heightNumber * -1) + zeroSet
            }, settings.speed * ((10 - oldDigit) / 10), 'linear').animate({
              top: zeroSet
            }, 1, 'linear').animate({
              top: (newDigit * settings.heightNumber * -1) + zeroSet
            }, settings.speed * oldDigit / 10, settings.easing);
          } else {
            col.animate({
              top: (newDigit * settings.heightNumber * -1) + zeroSet
            }, settings.speed, settings.easing);
          }
        }
      }
    }