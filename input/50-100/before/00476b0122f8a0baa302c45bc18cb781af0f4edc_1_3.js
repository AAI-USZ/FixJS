function(u) {
      var isDay = u.unit === 'day';
      if(paramExists(u.unit) || (isDay && paramExists('weekday'))) {
        params.specificity = u.unit;
        return false;
      } else if(reset && u.unit !== 'week' && (!isDay || !paramExists('week'))) {
        // Days are relative to months, not weeks, so don't reset if a week exists.
        callDateMethod(d, 'set', utc, u.method, (isDay ? 1 : 0));
      }
    }