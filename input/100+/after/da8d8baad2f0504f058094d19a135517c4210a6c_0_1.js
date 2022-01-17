function() {

    
    var page_load_time = new Date();
    // Check whether the page has got a bit old
    var page_timeout_interval = setInterval(function() {
        if ( ((new Date()) - page_load_time) > 30 * 60000) {
            window.location.reload();
            // Just in case, shouldn't really make it here
            clearInterval(page_timeout_interval);
        }
    }, 60000);
    var last_explosion = new Date('2011/09/17 13:00');
    function updateCalendar(cal) {
        var calendar_script = document.createElement('script');
        calendar_script.setAttribute('type','text/javascript');
        calendar_script.setAttribute('src','http://doesliverpool.com/does-api/calendar.php?callback=DoES.calendarCallback&cal='+encodeURIComponent(cal)+'&cb='+Math.random());
        document.getElementsByTagName('head')[0].appendChild(calendar_script);
    }
    function getDateNumber() {
        var now = new Date();
        var nowDate = String(now.getYear()+1900);
        var month = now.getMonth()+1;
        var day = now.getDate();
        if (month < 10) {
            nowDate += '0';
        }
        nowDate += month;
        if (day < 10) {
            nowDate += '0';
        }
        nowDate += day;
        return Number(nowDate);
    }
    var names = [];
    function calendarCallback(ical) {
        var lines = ical.split(/(\n|\r)/);
        var iCalEvent;
        var dateNum = getDateNumber();
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
                var today = new Date();
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
                //RRULE:FREQ=WEEKLY;INTERVAL=4;BYDAY=TH
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
                    if (day == (new Date()).getDay()) {
                        day_matched = true;
                        break;
                    }
                }
            }
            return day_matched;
        }
        function handleEvent() {
            var name = iCalEvent.summary.split(/\s/)[0];
            var valid = false;
            if (Number(iCalEvent.end) == Number(iCalEvent.start)) {
                iCalEvent.end = Number(iCalEvent.end)+1;
            }
            if (iCalEvent.rrule) {
                //FREQ=WEEKLY;BYDAY=MO,WE,TH,FR;UNTIL=20110826
                valid = valid || iCalRRuleMatches(iCalEvent.rrule);
            } else if (iCalEvent.start && iCalEvent.end && iCalEvent.summary) {
                if (Number(iCalEvent.start) <= dateNum && Number(iCalEvent.end) > dateNum) {
                    valid = true;
                }
            }
            if (iCalEvent.location && ! iCalEvent.location.match(/(DoES|Office|Meeting Room|Boardroom|board room)/i)) {
                valid = false;
            }
            // Check for exclusions
            if (valid && iCalEvent.exdate) {
                for (var i = 0, l = iCalEvent.exdate.length; i < l; ++i) {
                    if (Number(iCalEvent.exdate[i]) == dateNum) {
                        valid = false;
                        break;
                    }
                }
            }
            if (valid) {
                var matches = iCalEvent.summary.match(/^("([^"]+)"|'([^']+)')/);
                var name = iCalEvent.summary.split(/\s/)[0];
                if (matches && matches[2] ) {
                    name = matches[2];
                } else if (matches && matches[3]) {
                    name = matches[3];
                }
                names.push(name);
            }
            iCalEvent = null;
        }
        for (var i = 0, l = lines.length; i < l; ++i) {
            var line = lines[i];
            var matches;
            if (line == 'BEGIN:VEVENT') {
                iCalEvent = {};
            } else if (line == 'END:VEVENT') {
                handleEvent();
            } else if ((matches = line.match(/^(DTSTART;VALUE=DATE:([0-9]+)(T[0-9TZ]+)?|DTSTART:([0-9]+)(T[0-9TZ]+)?)/))) {
                if (iCalEvent) {
                    if (matches[2]) {
                        iCalEvent.start = matches[2];
                    } else if (matches[4]) {
                        iCalEvent.start = matches[4];
                    }
                }
            } else if ((matches = line.match(/^(DTEND;VALUE=DATE:([0-9]+)(T[0-9TZ]+)?|DTEND:([0-9]+)(T[0-9TZ]+)?)/))) {
                if (iCalEvent) {
                    if (matches[2]) {
                        iCalEvent.end = matches[2];
                    } else if (matches[4]) {
                        iCalEvent.end = matches[4];
                    }
                }
            } else if ((matches = line.match(/^SUMMARY:(.*)$/))) {
                if (iCalEvent) {
                    iCalEvent.summary = matches[1];
                }
            } else if ((matches = line.match(/^RRULE:(.*)$/))) {
                if (iCalEvent) {
                    iCalEvent.rrule = matches[1];
                }
            } else if ((matches = line.match(/^LOCATION:(.*)$/))) {
                if (iCalEvent) {
                    iCalEvent.location = matches[1];
                }
            } else if ((matches = line.match(/^EXDATE;VALUE=DATE:([0-9]+)$/))) {
                if (iCalEvent) {
                    if (!iCalEvent.exdate) {
                        iCalEvent.exdate = [];
                    }
                    iCalEvent.exdate.push( matches[1] );
                }
            }
        }
        var welcomeString = 'Welcome to <span class="doesname">DoES Liverpool</span>';
        if (names.length == 1 ) {
            welcomeString = 'Welcome '+names[0];
        } else if (names.length > 0) {
            var namesCopy = names.concat();
            var lastName = namesCopy.pop();
            welcomeString = 'Welcome '+namesCopy.join(', ')+' and '+lastName;
        }
        $('.welcome').html(welcomeString);
    }
    function updateExplosions() {
        var now = new Date();
        var days = Math.floor((now - last_explosion) / 86400000)
        $('.explosions .days').text(days);
    }

    $(function(){updateCalendar('hotdeskers');updateCalendar('events');});
    $(updateExplosions);

    return {
        calendarCallback: calendarCallback,
        // safety hack
        1:1
    };
}