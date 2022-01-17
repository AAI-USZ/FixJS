function() {
    var content = get(this, 'content'),
        value = get(this, 'value'),
        valuePath = get(this, 'optionValuePath').replace(/^content\.?/, ''),
        selectedValue = (valuePath ? getPath(this, 'selection.' + valuePath) : get(this, 'selection')),
        selection;

    if (value !== selectedValue) {
      selection = content.find(function(obj) {
        return value === (valuePath ? get(obj, valuePath) : obj);
      });

      this.set('selection', selection);
    }
  }