function(key, value) {
    if (arguments.length === 2) { return value; }

    var valuePath = get(this, 'optionValuePath').replace(/^content\.?/, '');
    return valuePath ? get(this, 'selection.' + valuePath) : get(this, 'selection');
  }