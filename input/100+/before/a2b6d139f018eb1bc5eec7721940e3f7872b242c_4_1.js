function(g) {
        g.select("g.x").remove();
        chart.x().range([0, (chart.width() - chart.margins().left - chart.margins().right)]);
        _axisX = _axisX.scale(chart.x()).orient("bottom");
        g.append("g")
            .attr("class", "axis x")
            .attr("transform", "translate(" + chart.margins().left + "," + chart.xAxisY() + ")")
            .call(_axisX);
    }