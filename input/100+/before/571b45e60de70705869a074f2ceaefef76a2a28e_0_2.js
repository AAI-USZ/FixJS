function numberPolyfillInit(){

  var getParams = function(elem) {
    var step = jQuery(elem).attr('step');
    step = /^-?\d+(?:\.\d+)?jQuery/.test(step) ? parseFloat(step) : undefined;
    var min = jQuery(elem).attr('min');
    min = /^-?\d+(?:\.\d+)?jQuery/.test(min) ? parseFloat(min) : undefined;
    var max = jQuery(elem).attr('max');
    max = /^-?\d+(?:\.\d+)?jQuery/.test(max) ? parseFloat(max) : undefined;

    var val = parseFloat(jQuery(elem).val())
    if (isNaN(val)) val = min || 0;

    return {
      min: min,
      max: max,
      step: step,
      val: val
    };
  };

  var clipValues = function(value, min, max) {
    if (max !== undefined && value > max) {
      return max;
    } else if (min !== undefined && value < min) {
      return min;
    } else {
      return value;
    }
  };
  
  var extractNumDecimalDigits = function(input) {
    if (input !== undefined) {
      var num = 0;
      var raisedNum = input;
      while (raisedNum != Math.round(raisedNum)) {
        num += 1;
        raisedNum = input * Math.pow(10, num);
      }
      return num;
    } else {
      return 0;
      }
  }

  var matchStep = function(value, min, max, step) {
    var stepDecimalDigits = extractNumDecimalDigits(step);
    if (step === undefined) {
      return value;
    } else if (stepDecimalDigits == 0) {
      var mod = (value - (min || 0)) % step;
      if (mod == 0) {
        return value;
      } else {
        var stepDown = value - mod;
        var stepUp = stepDown + step;
        if ((stepUp > max) || ((value - stepDown) < (stepUp - value))) {
          return stepDown;
        } else {
          return stepUp;
        }
      }
    } else {
      var raiseTo = Math.pow(10, stepDecimalDigits);
      var raisedStep = step * raiseTo;
      var raisedMod = (value - (min || 0)) * raiseTo % raisedStep;
      if (raisedMod == 0) {
        return value;
      } else {
        var raisedValue = (value * raiseTo);
        var raisedStepDown = raisedValue - raisedMod;
        var raisedStepUp = raisedStepDown + raisedStep;
        if (((raisedStepUp / raiseTo) > max) || ((raisedValue - raisedStepDown) < (raisedStepUp - raisedValue))) {
          return (raisedStepDown / raiseTo);
        } else {
          return (raisedStepUp / raiseTo);
        }
      }
    }
  };

  var increment = function(elem) {
    var params = getParams(elem);
    var raiseTo = Math.pow(10, Math.max(extractNumDecimalDigits(params['val']), extractNumDecimalDigits(params['step'])));
    var newVal = (Math.round(params['val'] * raiseTo) + Math.round((params['step'] || 1) * raiseTo)) / raiseTo;

    if (params['max'] !== undefined && newVal > params['max']) newVal = params['max'];
    newVal = matchStep(newVal, params['min'], params['max'], params['step']);

    jQuery(elem).val(newVal).change();
  };

  var decrement = function(elem) {
    var params = getParams(elem);
    var raiseTo = Math.pow(10, Math.max(extractNumDecimalDigits(params['val']), extractNumDecimalDigits(params['step'])));
    var newVal = (Math.round(params['val'] * raiseTo) - Math.round((params['step'] || 1) * raiseTo)) / raiseTo;

    if (params['min'] !== undefined && newVal < params['min']) newVal = params['min'];
    newVal = matchStep(newVal, params['min'], params['max'], params['step']);

    jQuery(elem).val(newVal).change();
  };

  jQuery.fn.positionTicker = function(target) {
    var targetObject = jQuery( target ),
      wrapperObject = jQuery( this ),
      offsetValues =  targetObject.offset();
      topPosition = offsetValues.top,
      leftPosition = offsetValues.left + targetObject.outerWidth() - wrapperObject.width(),
      newPosition = {
        top: topPosition,
        left: leftPosition
      };

    wrapperObject.css( 'position', 'absolute' ).offset( newPosition );
  };

  jQuery('input[type="number"]').each(function(index) {
    var elem = this,
      halfHeight = (jQuery(elem).outerHeight() / 2) + 'px',
      upBtn = document.createElement('div'),
      downBtn = document.createElement('div'),
      btnContainer = document.createElement('div');

    jQuery(upBtn).addClass('number-spin-btn');
    jQuery(upBtn).addClass('number-spin-btn-up');
    jQuery(upBtn).css('height', halfHeight);
    
    jQuery(downBtn).addClass('number-spin-btn');
    jQuery(downBtn).addClass('number-spin-btn-down');
    jQuery(downBtn).css('height', halfHeight);
    
    btnContainer.appendChild(upBtn);
    btnContainer.appendChild(downBtn);
    
    jQuery(btnContainer).addClass('number-spin-btn-container');
    jQuery(btnContainer).insertAfter(elem);
    jQuery(btnContainer).positionTicker(elem);

    jQuery(elem).bind({
      DOMMouseScroll: function(event) {
        if (event.originalEvent.detail < 0) {
        increment(this);
        } else {
        decrement(this);
        }
          event.preventDefault();
      },
      mousewheel: function(event) {
        if (event.wheelDelta > 0) {
        increment(this);
        } else {
        decrement(this);
        }
        event.preventDefault();
      },
      keypress: function(event) {
        if (event.keyCode == 38) { // up arrow
        increment(this);
        } else if (event.keyCode == 40) { // down arrow
        decrement(this);
        } else if (([8, 9, 35, 36, 37, 39].indexOf(event.keyCode) == -1) &&
           ([45, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57].indexOf(event.which) == -1)) {
        event.preventDefault();
        }
      },
      change: function(event) {
        if (event.originalEvent !== undefined) {
          var params = getParams(this);

          newVal = clipValues(params['val'], params['min'], params['max']);
          newVal = matchStep(newVal, params['min'], params['max'], params['step'], params['stepDecimal']);

          jQuery(this).val(newVal);
        }
      }
    });

    jQuery(upBtn).bind({
      mousedown: function(event) {
        increment(elem);

        var timeoutFunc = function(elem, incFunc) {
          incFunc(elem);

          elem.timeoutID = window.setTimeout(timeoutFunc, 10, elem, incFunc);
        };

        var releaseFunc = function(event) {
          window.clearTimeout(elem.timeoutID);
          jQuery(document).unbind('mouseup', releaseFunc);
          jQuery(upBtn).unbind('mouseleave', releaseFunc);
        };

        jQuery(document).bind('mouseup', releaseFunc);
        jQuery(upBtn).bind('mouseleave', releaseFunc);

        elem.timeoutID = window.setTimeout(timeoutFunc, 700, elem, increment);
      }
    });

    jQuery(downBtn).bind({
      mousedown: function(event) {
        decrement(elem);

        var timeoutFunc = function(elem, decFunc) {
          decFunc(elem);

          elem.timeoutID = window.setTimeout(timeoutFunc, 10, elem, decFunc);
        };

        var releaseFunc = function(event) {
          window.clearTimeout(elem.timeoutID);
          jQuery(document).unbind('mouseup', releaseFunc);
          jQuery(downBtn).unbind('mouseleave', releaseFunc);
        };

        jQuery(document).bind('mouseup', releaseFunc);
        jQuery(downBtn).bind('mouseleave', releaseFunc);

        elem.timeoutID = window.setTimeout(timeoutFunc, 700, elem, decrement);
      }
    });
    jQuery(this).css('text-align', 'left');
  });
}