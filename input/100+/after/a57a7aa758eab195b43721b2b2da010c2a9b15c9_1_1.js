function(eventName, e)
    {
        if (eventName == 'ref')
            return;

        // the days, hours, minutes, seconds until the time
        var t = DateSpan.timeTilData(e['time']);

        // if the time finished more than 1 day ago, don't output the event
        if (t['d'] <= -1)
            return;
        else
        {
            for (k in t)
                t[k] = Math.max(0, t[k]);
        }

        if (first)
            ctnt += '<div class="group" id="firstGroup">';
        else
            ctnt += '<div class="group">';

        // There are # days ...
        var roundedDays = DateSpan.roundedDays(t);
        ctnt += "<div class='row main'>";
        ctnt += '<div class="l">There '+U.isAre(roundedDays)+' <span class="days">'+roundedDays+'</span></div>';

        ctnt += "<div class='r'>";
        // /total
        if (e['ref'])
        {
            var totalDays = DateSpan.roundedDays(DateSpan.timeInDataInterval(e['ref'], e['time']));
            ctnt += '<span class="total">/'+totalDays+'</span> ';
        }

        // # days phrase
        ctnt += U.pluralize(roundedDays, 'day')+' '+e['phrase']+'</div>';
        ctnt += '</div>';

        $.each(['day', 'hour', 'minute', 'second'], function(i, v) {
            if (i < U.detailLevel)
            {
                ctnt += "<div class='row subtime'>";
                ctnt += '<div class="l num">'+t[v[0]]+'</div>';
                ctnt += '<div class="r">'+U.pluralize(t[v[0]], v)+'.</div>';
                ctnt += '</div>';
            }
        });

        // % complete
        if (e['ref'])
        {
            var refTime = DateSpan.dataToTime(e['ref']);
            var endTime = DateSpan.dataToTime(e['time']);
            var now = moment();

            var complete = DateSpan.diff(refTime, now);
            var total = DateSpan.diff(refTime, endTime);

            var percStr = U.zeroFill(Math.floor(100000*complete/total)/1000, 3);

            ctnt += '<div class="row special"><div class="num l">'+percStr+'</div>';
            ctnt += '<div class="r">% complete.</div></div>';
        }

        // # school days
        var schoolDays = DateSpan.schoolDaysTilData(e['time']);
        ctnt += '<div class="row special"><div class="l num">'+schoolDays+'</div>';
        ctnt += '<div class="r">school days.</div></div>';

        ctnt += '</div>';

        if (first)
        {
            firstT = t;
            first = false;
        }
    }