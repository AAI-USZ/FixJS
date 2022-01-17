function()
{
    var first = true;

    var ctnt = "<div class='tableDiv'>";
    var firstT;
    for (eventName in this.events)
    {
        // the event object
        var e = this.events[eventName];

        // the days, hours, minutes, seconds until the time
        var t = DateSpan.timeTilData(e['time']);

        // if the time finished more than 1 day ago, don't output the event
        if (t['d'] <= -1)
            continue;
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
        ctnt += '<div class="l">There '+this.isAre(roundedDays)+' <span class="days">'+roundedDays+'</span></div>';

        ctnt += "<div class='r'>";
        // /total
        if (e['ref'])
        {
            var totalDays = DateSpan.roundedDays(DateSpan.timeInDataInterval(e['ref'], e['time']));
            ctnt += '<span class="total">/'+totalDays+'</span> ';
        }

        // # days phrase
        ctnt += this.pluralize(roundedDays, 'day')+' '+e['phrase']+'</div>';
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

            var complete = now.diff(refTime, 'seconds', true);
            var total = endTime.diff(refTime, 'seconds', true);

            var percStr = this.zeroFill(Math.floor(100000*complete/total)/1000, 3);

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

    $('#wrapper').html(ctnt);

    $("canvas").clearCanvas();

    // draw timeline
    this.drawLine({
        x1: this.margin, y1: this.h/2,
        x2: this.w-this.margin, y2: this.h/2,
        strokeStyle: Conf.timelineFuture
    });

    // draw beginning and end ticks
    this.drawLine({
        x1: this.margin-.5, y1: this.h/2-this.tickH/2,
        x2: this.margin-.5, y2: this.h/2+this.tickH/2,
        strokeStyle: Conf.timelinePast
    });
    this.drawLine({
        x1: this.w-this.margin+.5, y1: this.h/2-this.tickH/2,
        x2: this.w-this.margin+.5, y2: this.h/2+this.tickH/2,
        strokeStyle: Conf.timelineFuture
    });

    var refDate = DateSpan.dataToTime(this.data['ref']);
    var refDateStr = refDate.format(this.dateFmtStr);

    // write ref event time
    this.drawText({
        x: this.margin, y: this.h/2+this.tickH/2,
        text: refDateStr,
        align: "left", baseline: "top"
    });

    // find the last event
    var lastEvent = this.events[Object.keys(this.events)[0]];
    for (eventName in this.events)
    {
        var e = this.events[eventName];
        var date = DateSpan.dataToTime(e['time']);
        if (date > DateSpan.dataToTime(lastEvent['time']))
            lastEvent = e;
    }

    // draw the last event time
    var endDateStr = DateSpan.dataToTime(lastEvent['time']).format(this.dateFmtStr);
    this.drawText({
        x: this.w-this.margin, y: this.h/2+this.tickH/2,
        text: endDateStr,
        align: "right", baseline: "top"
    });

    // draw other events
    for (eventName in this.events)
    {
        var e = this.events[eventName];
        if (e != lastEvent)
        {
            var isPast = false;
            if (DateSpan.dataToTime(e['time']) < moment())
                isPast = true;

            this.drawEvent(e, refDate, lastEvent, isPast);
        }
    }

    // draw now dot
    var totalSecs = refDate.diff(DateSpan.dataToTime(lastEvent['time']), 'seconds');
    var nowPosPercent = refDate.diff(moment(), 'seconds')/totalSecs;
    // draw past line
    this.drawLine({
        x1: this.margin, y1: this.h/2,
        x2: this.w*nowPosPercent, y2: this.h/2,
        strokeStyle: Conf.timelinePast
    });
    $("canvas").drawEllipse({
        fillStyle:Conf.secondaryColor,
        x: this.w*nowPosPercent, y: this.h/2, width: 10, height: 10, 
        fromCenter:true
    });
}