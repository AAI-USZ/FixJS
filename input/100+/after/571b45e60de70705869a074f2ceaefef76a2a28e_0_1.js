function(elem) {
    var step = elem.getAttribute('step');
    step = /^-?\d+(?:\.\d+)?$/.test(step) ? parseFloat(step) : undefined;
    var min = elem.getAttribute('min');
    min = /^-?\d+(?:\.\d+)?$/.test(min) ? parseFloat(min) : undefined;
    var max = elem.getAttribute('max');
    max = /^-?\d+(?:\.\d+)?$/.test(max) ? parseFloat(max) : undefined;

    var val = parseFloat(elem.value);

    if(isNaN(val)) {
      val = min || 0;
    }

    return {
      min: min,
      max: max,
      step: step,
      val: val
    };
  }