function() {
        return d3.max(chart.group().all(), function(e){return e.value;});
    }