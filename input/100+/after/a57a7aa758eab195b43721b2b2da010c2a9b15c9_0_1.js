function(start, end)
{
    var diff = this.diff(start, end);
    var days = this.roundTowardsZero(diff/1000/60/60/24);
    var hours = this.roundTowardsZero(diff/1000/60/60 % 24);
    var minutes = this.roundTowardsZero(diff/1000/60 % 60);
    var seconds = this.roundTowardsZero(diff/1000 % 60);

    return {'d': days,
            'h': hours,
            'm': minutes,
            's': seconds};
}