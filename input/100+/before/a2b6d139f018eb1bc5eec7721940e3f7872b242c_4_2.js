function(g) {
        g.select("g.y").remove();
        _y.domain([chart.minY(), chart.maxY()]).rangeRound([chart.yAxisHeight(), 0]);
        _axisY = _axisY.scale(_y).orient("left").ticks(DEFAULT_Y_AXIS_TICKS);
        g.append("g")
            .attr("class", "axis y")
            .attr("transform", "translate(" + chart.margins().left + "," + chart.margins().top + ")")
            .call(_axisY);
    }