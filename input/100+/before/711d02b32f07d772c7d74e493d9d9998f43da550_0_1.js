function(u,i) {
      var unit   = u.unit;
      var method = u.method;
      var value = isDefined(params[unit]) ? params[unit] : params[unit + 's'];
      if(isUndefined(value)) return;
      if(advance) {
        if(unit === 'week') {
          value  = (params['day'] || 0) + (value * 7);
          method = 'Date';
        }
        value = (value * advance) + callDateMethod(date, 'get', '', method);
      }
      callDateMethod(date, 'set', utc, method, value);
      if(unit === 'month') {
        checkMonthTraversal(date, value);
      }
    }