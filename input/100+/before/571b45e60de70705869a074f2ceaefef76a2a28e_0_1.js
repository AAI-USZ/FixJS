function(elem) {
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
  }