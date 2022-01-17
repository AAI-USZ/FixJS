function($) {
  $.fn.jOdometer = function(settings) {

    if (this.length > 1) {
      this.each(function() {
        $(this).jOdometer(settings)
      });
      return this;
    }

    // override default configuration
    settings = $.extend({}, $.fn.jOdometer.defaults, settings);

    this.goToNumber = function(newCounter) {
      advanceCounter(newCounter);
    };

    // for each counter
    // return this.each(function(){
    var scope = $(this); // store the actual counter
    var $this = this;

    var zeroSet = -settings.heightNumber; // position of the first 0
    var counter = parseFloat(settings.counterStart); // initialize counter with the start number
    // to store the digits of the number
    var integersArray = [];
    var decimalsArray = [];
    var digits = String(settings.counterStart).split('.'); // separate integers and decimals
    var numberOfDecimals = 0;
    var widthDot = 0;
    // if has decimals
    if (digits[1]) {
      // create a column for each decimal digit with the image in the position of the correspondent number
      var j = 0;
      for (var i = digits[1].length - 1; i > -1; i--) {
        decimalsArray[i] = digits[1].charAt(i);
        $(this).append('<img style="position:absolute; right:' + (j * settings.widthNumber + settings.offsetRight + j * settings.spaceNumbers) + 'px; top:' + ((parseInt(decimalsArray[i]) * settings.heightNumber * -1) + zeroSet) + 'px;" class="jodometer_decimal_' + i + '" src="' + settings.numbersImage + '" alt="Decimal ' + (i + 1) + '" />');
        j++;
      }
      // add the dot (use background div so can be different width)
      $(this).append('<div style="position:absolute; width:' + settings.widthDot + 'px; height:' + settings.heightNumber + 'px; background:url(' + settings.numbersImage + ') no-repeat center ' + ((12 * (settings.heightNumber) * -1) + zeroSet) + 'px; right:' + (digits[1].length * settings.widthNumber + settings.offsetRight + digits[1].length * settings.spaceNumbers) + 'px;" class="jodometer_dot"></div>');
      numberOfDecimals = digits[1].length;
      widthDot = settings.widthDot;
    }
    // create a column for each integer digit with the image in the position of the correspondent number
    var integers = digits[0];
    var j = integers.length - 1;
    var commaExtraWidth = 0;
    var n = settings.maxDigits == 0 ? integers.length : settings.maxDigits;
    for (var i = 0; i < n ; i++) {
      if (i < integers.length)
        integersArray[i] = integers.charAt(j);
      else
        integersArray[i] = '';

      // Insert comma if wanted (helps make large numbers more readable)
      if (settings.formatNumber && i > 0 && i % 3 == 0) {
        $(this).append('<div style="position:absolute; width:' + settings.widthDot + 'px; ' +
                       'height:' + settings.heightNumber + 'px; '+
                       'background:url(' + settings.numbersImage + ') '+
                       'no-repeat center bottom; ' +
                       'right:' + (i * settings.widthNumber + numberOfDecimals * settings.widthNumber + 
                                  widthDot + commaExtraWidth + settings.offsetRight + numberOfDecimals * 
                                  settings.spaceNumbers + i * settings.spaceNumbers + settings.spaceNumbers) + 'px;' +
                       '" class="jodometer_dot"></div>');
        commaExtraWidth += settings.widthDot + settings.spaceNumbers;
      }

      var display = '';
      // hide any positions that do not yet have digits
      if (j < 0)
        display = 'display:none; ';

      var c = parseInt(integersArray[i]);
      if (settings.prefixChar && j == -1){ 
        // always show prefixChar position
        display = '';
        c = 14; // prefix char
      }

      // Set position image to its initial placement. If this position initially has no value
      // then hide it (display:none) and position it at '0'. 
      $(this).append('<img style="' + display +
        'position:absolute; ' +
        'right:' + (i * settings.widthNumber + numberOfDecimals * settings.widthNumber + widthDot + commaExtraWidth + settings.offsetRight + numberOfDecimals * settings.spaceNumbers + i * settings.spaceNumbers + settings.spaceNumbers) + 'px; '+
        'top:' + ((c * settings.heightNumber * -1) + zeroSet) + 'px;' +
        '" class="jodometer_integer_' + i + '" src="' + settings.numbersImage + '" alt="Integer ' + (i + 1) + '" />');
      j--;
    }
    // add the interval
    if (parseFloat(settings.counterStart) != settings.counterEnd || (settings.counterEnd.toString() == 'false' && parseFloat(settings.counterStart) == 0)) {
      var counterInterval = setInterval(function() {
        advanceCounter();
      }, settings.delayTime);
    }

    // set the number increments


    function advanceCounter(newCounter) {
      if (newCounter != undefined) {
        clearInterval(counterInterval);
        counter = newCounter;
        setNumbers(counter);
      } else {
        setNumbers(counter);
        counter = counter + settings.increment; // increment the number 
      }
      // setNumbers(counter);
      // if we reach the end clear the interval and use the ending number
      if (settings.counterEnd != false && counter >= settings.counterEnd) {
        clearInterval(counterInterval);
        setNumbers(settings.counterEnd);
      }
    }

    // to move the colums from one number position to another


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
    // changes the column position from one number to another


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
    return this;
    // });
  };
  // default settings
  $.fn.jOdometer.defaults = {
    counterStart: '0000.00',
    counterEnd: false,
    delayTime: 1000,
    increment: 0.01,
    speed: 500,
    easing: 'swing',
    numbersImage: '/images/jodometer-numbers.png',
    formatNumber: false,
    heightNumber: 31,
    widthNumber: 14,
    offsetRight: 0,
    spaceNumbers: 0,
    widthDot: 10,
    maxDigits: 0,
    prefixChar: false
  };
}