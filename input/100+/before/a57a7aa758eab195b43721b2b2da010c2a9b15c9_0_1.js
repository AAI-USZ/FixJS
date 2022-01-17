function(start, end)
{
    var days = this.roundTowardsZero(end.diff(start, 'days', true));
    var hours = this.roundTowardsZero(end.diff(start, 'hours', true) % 24);
    var minutes = this.roundTowardsZero(end.diff(start, 'minutes', true) % 60);
    var seconds = this.roundTowardsZero(end.diff(start, 'seconds', true) % 60);

    return {'d': days,
            'h': hours,
            'm': minutes,
            's': seconds};
}