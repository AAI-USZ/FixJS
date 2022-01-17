function(memo, value, key, obj) {
    var attr = {};
    if(value !== '' && !_.isUndefined(value) && !_.isNull(value) && !isEmptyArray(value)) {

      if(Object.prototype.toString.call(value) === '[object Object]') {
        var action = Object.keys(value)[0];

        if(value[action] === 'DELETE' && !value['Value']) {
          attr.Action = 'DELETE'
        } else {
          attr.Action = String.prototype.toUpperCase.call(action);
          if(!_.isUndefined(value[action]) && !_.isNull(value[action]) && !isEmptyArray(value[action])) {
            attr.Value = {};
            attr.Value[typeIndicator(value[action])] = toString(value[action]);
          }
        }
      } else {
        attr.Value = {};
        attr.Value[typeIndicator(value)] = toString(value);
        attr.Action = 'PUT';  
      }
    } else {
      attr.Action = 'DELETE';
    }

    memo[key] = attr;

    return memo;
  },{}