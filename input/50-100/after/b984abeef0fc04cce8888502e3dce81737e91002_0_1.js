function(selections, chart, callback) {
    var duration = chart.transitionDuration();

    if(duration <= 0)
        return selections;

    var s = selections
        .transition()
        .duration(duration);

    if(callback instanceof Function){
        callback(s);
    }

    return s;
}