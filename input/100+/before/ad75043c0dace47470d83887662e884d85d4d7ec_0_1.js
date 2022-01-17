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

        // if this is the first time this position had a value show it
        if (j >= 0 && oldDigit == ''){
          $('.jodometer_integer_' + i, scope).show();
          oldDigit = '0';
        }

        updatePosition($('.jodometer_integer_' + i, scope), parseInt(integersArray[i]), parseInt(oldDigit));

        j--;
      }
    }