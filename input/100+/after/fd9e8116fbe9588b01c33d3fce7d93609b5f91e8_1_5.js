function(dif) {
        var match = f.match(dif.reg);
        if(match) {
          format = dif;
          loc = getLocalization(format.locale, true);
          set = getFormatMatch(match, format.to, loc);

          if(set.timestamp) {
            d.setTime(0);
            set = { 'milliseconds': set.timestamp };
            return false;
          }

          // If there's a European variant, swap the month and day.
          if(format.variant && !object.isString(set['month']) && (object.isString(set['date']) || variant)) {
            tmp = set['month'];
            set['month'] = set['date'];
            set['date'] = tmp;
          }

          // If the year is 2 digits then get the implied century.
          if(set['year'] && set.yearAsString.length === 2) {
            set['year'] = getYearFromAbbreviation(set['year']);
          }

          // Set the month which may be localized.
          if(set['month']) {
            set['month'] = loc.getMonth(set['month']);
            if(set['shift'] && !set['unit']) set['unit'] = loc['units'][7];
          }

          // If there is both a weekday and a date, the date takes precedence.
          if(set['weekday'] && set['date']) {
            delete set['weekday'];
          // Otherwise set a localized weekday.
          } else if(set['weekday']) {
            set['weekday'] = loc.getWeekday(set['weekday']);
            if(set['shift'] && !set['unit']) set['unit'] = loc['units'][5];
          }

          // Relative day localizations such as "today" and "tomorrow".
          if(set['day'] && (tmp = loc.modifiersByName[set['day']])) {
            set['day'] = tmp.value;
            d.resetTime();
            relative = true;
          // If the day is a weekday, then set that instead.
          } else if(set['day'] && (tmp = loc.getWeekday(set['day'])) > -1) {
            delete set['day'];
            set['weekday'] = tmp;
          }

          if(set['date'] && !object.isNumber(set['date'])) {
            set['date'] = loc.getNumericDate(set['date']);
          }

          // If the time is 1pm-11pm advance the time by 12 hours.
          if(set['meridian']) {
            if(set['meridian'] === loc['postMeridian'] && set['hour'] < 12) set['hour'] += 12;
          }

          // Adjust for timezone offset
          if('offset_hours' in set || 'offset_minutes' in set) {
            set['utc'] = true;
            set['offset_minutes'] = set['offset_minutes'] || 0;
            set['offset_minutes'] += set['offset_hours'] * 60;
            if(set['offset_sign'] === '-') {
              set['offset_minutes'] *= -1;
            }
            set['minute'] -= set['offset_minutes'];
          }

          // Date has a unit like "days", "months", etc. are all relative to the current date.
          if(set['unit']) {
            relative = true;
            num = loc.getNumber(set['num']);
            unit = loc.getEnglishUnit(set['unit']);

            // Shift and unit, ie "next month", "last week", etc.
            if(set['shift'] || set['edge']) {
              num *= (tmp = loc.modifiersByName[set['shift']]) ? tmp.value : 0;

              // Relative month and static date: "the 15th of last month"
              if(unit === 'month' && isDefined(set['date'])) {
                d.set({ 'day': set['date'] }, true);
                delete set['date'];
              }

              // Relative year and static month/date: "June 15th of last year"
              if(unit === 'year' && isDefined(set['month'])) {
                d.set({ 'month': set['month'], 'day': set['date'] }, true);
                delete set['month'];
                delete set['date'];
              }
            }
            // Unit and sign, ie "months ago", "weeks from now", etc.
            if(set['sign'] && (tmp = loc.modifiersByName[set['sign']])) {
              num *= tmp.value;
            }

            // Units can be with non-relative dates, set here. ie "the day after monday"
            if(isDefined(set['weekday'])) {
              d.set({'weekday': set['weekday'] }, true);
              delete set['weekday'];
            }

            // Finally shift the unit.
            set[unit] = (set[unit] || 0) + num;
          }

          if(set['year_sign'] === '-') {
            set['year'] *= -1;
          }

          DateUnitsReversed.slice(1,4).each(function(u, i) {
            var value = set[u.unit], fraction = value % 1;
            if(fraction) {
              set[DateUnitsReversed[i].unit] = (fraction * (u.unit === 'second' ? 1000 : 60)).round();
              set[u.unit] = value | 0;
            }
          });
          return false;
        }
      }