function iCalRRuleMatches(rrule) {
            var parts = rrule.split(/;/);
            var rruleObj = {};
            for (var i = 0, l = parts.length; i < l; i++) {
                var bits = parts[i].split(/=/);
                rruleObj[bits[0].toLowerCase()] = bits[1];
            }
            // Should learn what else might happen too at some point
            if (rruleObj.freq != 'WEEKLY' && rruleObj.freq != 'DAILY') {
                return false;
            }
            if (Number(iCalEvent.start) > dateNum) {
                return false;
            }
            if ( rruleObj.until && Number(rruleObj.until.substring(0,8)) <= dateNum) {
                return false;
            }
            if (rruleObj.freq == 'DAILY') {
                // No need to check days
                return true;
            }
            /*if (!rruleObj.byday) {
                return false;
            }*/
            if (rruleObj.interval) {
                var today = dateToUse;
                today.setHours(0);
                today.setMinutes(0);
                today.setSeconds(0);
                var start = new Date(today);
                start.setYear(iCalEvent.start.substr(0,4));
                // Make sure the date is a date every month has
                start.setDate(1);
                start.setMonth(iCalEvent.start.substr(4,2)-1);
                start.setDate(iCalEvent.start.substr(6,2));
                var interval = Math.floor((today - start) / 86400000);
                switch(rruleObj.freq.toLowerCase()) {
                case 'weekly':
                    var weeks = interval / 7;
                    if (weeks == Math.floor(weeks) && ((interval / 7) % rruleObj.interval) == 0) {
                        return true;
                    }
                    break;
                case 'daily':
                    if (interval == rruleObj.interval) {
                        return true;
                    }
                    break;
                    // FIXME - add others?
                default:
                }
                return false;
            }
            var days = rruleObj.byday.split(',');
            var day_matched = false;
            for (var i = 0, l = days.length; i < l; ++i) {
                var day = null;
                switch (days[i]) {
                case 'SU':
                    day = 0;
                    break;
                case 'MO':
                    day = 1;
                    break;
                case 'TU':
                    day = 2;
                    break;
                case 'WE':
                    day = 3;
                    break;
                case 'TH':
                    day = 4;
                    break;
                case 'FR':
                    day = 5;
                    break;
                case 'SA':
                    day = 6;
                    break;
                }
                if (day !== null) {
                    if (day == (dateToUse).getDay()) {
                        day_matched = true;
                        break;
                    }
                }
            }
            return day_matched;
        }