function(e, refDate, lastEvent, isPast)
{
    // position of event e between refDate and lastEvent
    var totalSecs = DateSpan.diff(DateSpan.dataToTime(lastEvent['time']), refDate);
    var secsToE = DateSpan.diff(DateSpan.dataToTime(e['time']), refDate);
    var posPercent = secsToE/totalSecs;
    var args = {
        x1: this.w*posPercent+.5, y1: this.h/2-this.tickH/2,
        x2: this.w*posPercent+.5, y2: this.h/2
    };

    if (isPast)
        args['strokeStyle'] = Conf.timelinePast;

    // draw half-tick
    this.drawLine(args);

    // draw text
    var eStr = e['name'] + ", " + this.format(DateSpan.dataToTime(e['time']), this.timelineMidDateFmtStr);
    this.drawText({
        x: this.w*posPercent, y: this.h/2-this.tickH/2,
        align: 'center', baseline: 'bottom',
        text: eStr
    });
}