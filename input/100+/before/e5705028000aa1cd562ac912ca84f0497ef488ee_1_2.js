function(options) {
    if(!options) return;

    var self = this
      , attrs = []
      , key
      , value
      , i, k;

    // Loop through each option
    for(i in options) {
      key = utils.string.dasherize(i);
      value = options[i];

      // If it's a data key that has an object
      // loop through each of the values in the object
      // and create data attributes out of them
      if(key === 'data' && typeof value === 'object') {
        for(k in value) {
          attrs.push(self.dataAttribute(k, value[k]));
        }
      }
      // If the attribute is a boolean attribute
      // parse it as a bool attribute
      else if(utils.array.included(key, self.boolAttributes)) {
        if(value) attrs.push(self.boolAttribute(key));
      }
      // Just a normal attribute, parse it normally
      else if(value || value === '') {
        attrs.push(self.tagAttribute(key, value))
      }
    }

    if(attrs.length > 0) {
      return ' ' + attrs.sort().join(' ');
    } else return '';
  }