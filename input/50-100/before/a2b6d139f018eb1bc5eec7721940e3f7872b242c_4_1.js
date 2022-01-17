function() {
        var min = d3.min(chart.group().all(), function(e){return e.value;});
        if(min > 0) min = 0;
        return min;
    }