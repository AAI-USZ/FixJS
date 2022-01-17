function setNumbers(counter) {
      digits = String(counter).split('.'); // check decimals
      // if we where using decimals
      if (decimalsArray.length > 0) {
        // for each decimal digit, update the old digit position to the new
        for (i = 0; i < decimalsArray.length; i++) {
          oldDigit = decimalsArray[i];
          // the new number could have not decimal part, but we need it anyway
          if (digits[1]) {
            decimalsArray[i] = digits[1].charAt(i);
          }
          if (decimalsArray[i] == '') {
            decimalsArray[i] = '0';
          }
          updatePosition($('.jodometer_decimal_' + i, scope), parseInt(decimalsArray[i]), parseInt(oldDigit));
        }
      }

      integers = digits[0];
      j = integers.length - 1;
      var n = settings.maxDigits == 0 ? integersArray.length : settings.maxDigits;
      // for each integer digit, update the old digit position to the new
      for (i = 0; i < n; i++) {
        oldDigit = integersArray[i];
        if (j >= 0)
          integersArray[i] = integers.charAt(j);

        if (integersArray[i] == '' && settings.maxDigits == 0) {
          integersArray[i] = '0';
        }

        // we're dealing with a position that is either unused or prefixChar
        if (oldDigit == '') {
          if (settings.prefixChar) {
              if (j == 0){
                // This position currently has the prefixChar shown.
                // Show 1 and pretend we've come from 9
                $('.jodometer_integer_' + i, scope).animate({
                  top: zeroSet
                }, 0, 'linear');
                oldDigit = '0';
              } 

              if (j == -1){
                // This position was previously unused. Show prefix char
                $('.jodometer_integer_' + i, scope).animate({
                  top: (15 * settings.heightNumber * -1)
                }, 1, 'linear');
                $('.jodometer_integer_' + i, scope).show();
              }
          } else {
            if (j == 0){
              // This position was previously unused. Show it.
              $('.jodometer_integer_' + i, scope).show();
              oldDigit = '0';
            }
          }
        }

        updatePosition($('.jodometer_integer_' + i, scope), parseInt(integersArray[i]), parseInt(oldDigit));

        j--;
      }
    }