function(selections, chart) {
    var duration = chart.transitionDuration();

    if(duration <= 0)
        return selections;

    return selections
        .transition()
        .duration(duration);
}