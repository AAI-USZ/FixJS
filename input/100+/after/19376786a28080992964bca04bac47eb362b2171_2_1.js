function() {
        chart.resetSvg();

        if (chart.dataAreSet()) {
            var g = chart.generateTopLevelG().attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            x.rangeRound([0, (chart.width() - margin.left - margin.right)]);
            var axisX = d3.svg.axis().scale(x).orient("bottom");

            y.domain([0, maxY()]).rangeRound([yAxisHeight(), 0]);
            var axisY = d3.svg.axis().scale(y).orient("left").ticks(DEFAULT_Y_AXIS_TICKS);

            g.selectAll("rect")
                .data(chart.group().all())
                .enter()
                .append("rect")
                .attr("x", function(d) {
                    return x(d.key) + margin.left;
                })
                .attr("y", function(d) {
                    return margin.top + y(d.value);
                })
                .attr("width", 10)
                .attr("height", function(d) {
                    return yAxisHeight() - y(d.value);
                });

            g.append("g")
                .attr("class", "axis x")
                .attr("transform", "translate(" + margin.left + "," + xAxisY() + ")")
                .call(axisX);

            g.append("g")
                .attr("class", "axis y")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .call(axisY);
        }
    }