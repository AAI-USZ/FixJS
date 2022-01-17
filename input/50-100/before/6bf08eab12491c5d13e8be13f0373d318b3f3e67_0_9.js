function(key, value) {
    if (arguments.length === 2) { return value; }

    var valuePath = get(this, 'optionValuePath').replace(/^content\.?/, '');
    return valuePath ? getPath(this, 'selection.' + valuePath) : get(this, 'selection');
  }