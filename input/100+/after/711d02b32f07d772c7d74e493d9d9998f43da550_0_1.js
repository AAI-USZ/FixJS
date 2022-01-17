function(u,i) {
      var unit   = u.unit;
      var method = u.method;
      var value  = getParam(unit);
      if(isUndefined(value)) return;
      if(advance) {
        if(unit === 'week') {
          value  = (params['day'] || 0) + (value * 7);
          method = 'Date';
        }
        value = (value * advance) + callDateMethod(date, 'get', '', method);
      } else if(unit === 'month' && paramExists('day')) {
        // When setting the month, there is a chance that we will traverse into a new month.
        // This happens in DST shifts, for example June 1st DST jumping to January 1st
        // (non-DST) will have a shift of -1:00 which will traverse into the previous year.
        // Prevent this by proactively setting the day when we know it will be set again anyway.
        // It can also happen when there are not enough days in the target month. This second
        // situation is identical to checkMonthTraversal below, however when we are advancing
        // we want to reset the date to "the last date in the target month". In the case of
        // DST shifts, however, we want to avoid the "edges" of months as that is where this
        // unintended traversal can happen. This is the reason for the different handling of
        // two similar but slightly different situations.
        //
        // TL;DR This method avoids the edges of a month IF not advancing and the date is going
        // to be set anyway, while checkMonthTraversal resets the date to the last day if advancing.
        //
        date.setDate(15);
      }
      callDateMethod(date, 'set', utc, method, value);
      if(advance && unit === 'month') {
        checkMonthTraversal(date, value);
      }
    }