function handleEvent() {
            var name = iCalEvent.summary.split(/\s/)[0];
            isLiamOrBea = (name == "Liam" || name == "Bea");
            debug(name);
            var valid = false;
            if (Number(iCalEvent.end) == Number(iCalEvent.start)) {
                iCalEvent.end = Number(iCalEvent.end)+1;
            }
            if (iCalEvent.rrule) {
                console.log(name);
                //FREQ=WEEKLY;BYDAY=MO,WE,TH,FR;UNTIL=20110826
                valid = valid || iCalRRuleMatches(iCalEvent.rrule);
                debug("Valid after iCalRRuleMatches: "+valid)
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