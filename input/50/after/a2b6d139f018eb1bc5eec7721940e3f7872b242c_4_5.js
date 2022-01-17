function() {
        return d3.max(chart.group().all(), function(e){return chart.valueFunction()(e);});
    }