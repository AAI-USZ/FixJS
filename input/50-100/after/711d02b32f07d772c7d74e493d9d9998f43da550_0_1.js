function(u) {
      if(paramExists(u.unit)) {
        params.specificity = u.unit;
        return false;
      } else if(reset && u.unit !== 'week' && u.unit !== 'year') {
        callDateMethod(date, 'set', utc, u.method, (u.unit === 'day') ? 1 : 0);
      }
    }