function(g) {
        g.select("g.y").remove();
        _y.domain([chart.yAxisMin(), chart.yAxisMax()]).rangeRound([chart.yAxisHeight(), 0]);
        _yAxis = _yAxis.scale(_y).orient("left").ticks(DEFAULT_Y_AXIS_TICKS);
        g.append("g")
            .attr("class", "axis y")
            .attr("transform", "translate(" + chart.margins().left + "," + chart.margins().top + ")")
            .call(_yAxis);
    }