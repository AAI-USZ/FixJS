function updateDate(date, params, reset, utc, advance) {
    if(object.isNumber(params) && advance) {
      // If param is a number and we're advancing, the number is presumed to be milliseconds.
      params = { 'milliseconds': params };
    } else if(object.isNumber(params)) {
      // Otherwise just set the timestamp and return.
      date.setTime(params);
      return date;
    }

    // "date" can also be passed for the day
    if(params['date']) params['day'] = params['date'];
    // If a weekday is included in the params, set it ahead of time and set the params
    // to reflect the updated date so that resetting works properly.
    if(!advance && isUndefined(params['day']) && isDefined(params['weekday'])) {
      callDateMethod(date, 'set', utc, 'Weekday', params['weekday'])
      params['day'] = callDateMethod(date, 'get', utc, 'Date');
      delete params['weekday'];
    }
    // Reset any unit lower than the least specific unit set. Do not do this for weeks
    // or for years. This needs to be performed before the acutal setting of the date
    // because the order needs to be reversed in order to get the lowest specificity.
    // The order of the date setting is also fixed because higher order units can be
    // overwritten by lower order units, such as setting hour: 3, minute: 345, etc.
    DateUnitsReversed.each(function(u) {
      if(isDefined(params[u.unit]) || isDefined(params[u.unit + 's'])) {
        params.specificity = u.unit;
        return false;
      } else if(reset && u.unit !== 'week' && u.unit !== 'year') {
        callDateMethod(date, 'set', utc, u.method, (u.unit === 'day') ? 1 : 0);
      }
    });
    // Now actually set or advance the date in order, higher units first.
    DateUnits.each(function(u,i) {
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
    });
    return date;
  }