function(e, refDate, lastEvent, isPast)
{
    // position of event e between refDate and lastEvent
    var totalSecs = refDate.diff(DateSpan.dataToTime(lastEvent['time']), 'seconds');
    var secsToE = refDate.diff(DateSpan.dataToTime(e['time']), 'seconds');
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
    var eStr = e['name'] + ", " + DateSpan.dataToTime(e['time']).format(this.dateFmtStr);
    this.drawText({
        x: this.w*posPercent, y: this.h/2-this.tickH/2,
        align: 'center', baseline: 'bottom',
        text: eStr
    });
}