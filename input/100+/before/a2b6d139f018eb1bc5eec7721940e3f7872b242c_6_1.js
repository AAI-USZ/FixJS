function redrawLine() {
        chart.g().datum(chart.group().all());

        var path = chart.selectAll("path.line");

        if(path.empty())
            path = chart.g().append("path")
            .attr("class", "line");

        var line = d3.svg.line()
            .x(function(d) {
                return chart.x()(d.key);
            })
            .y(function(d) {
                return chart.y()(d.value);
            });

        path = path
            .attr("transform", "translate("+chart.margins().left+","+chart.margins().top+")");

        dc.transition(path, chart.transitionDuration(), function(t){t.ease("linear")})
            .attr("d", line);
    }