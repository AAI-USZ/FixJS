function() {
        var min = d3.min(chart.group().all(), function(e){return chart.valueFunction()(e);});
        if(min > 0) min = 0;
        return min;
    }