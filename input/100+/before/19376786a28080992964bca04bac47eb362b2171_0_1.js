function() {
        chart.resetSvg();

        if (chart.dataAreSet()) {
            var g = chart.generateTopLevelG().attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            x.rangeRound([0, (chart.width() - margin.left - margin.right)]);
            var axisX = d3.svg.axis().scale(x).orient("bottom");
            g.append("g")
                .attr("class", "axis x")
                .attr("transform", "translate(" + margin.left + "," + xAxisY() + ")")
                .call(axisX);

            var axisY = d3.svg.axis().scale(y).ticks(5).orient("left");
            y.domain([0, chart.group().top(1)[0].value]).rangeRound([0, yAxisHeight()]);
            g.append("g")
                .attr("class", "axis y")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .call(axisY);

            g.selectAll("rect")
                .data(chart.group().all())
                .enter()
                .append("rect")
                .attr("x", function(d) {
                    return x(d.key) + margin.left;
                })
                .attr("y", function(d) {
                    return margin.top + yAxisHeight() - y(d.value);
                })
                .attr("width", 10)
                .attr("height", function(d) {
                    return y(d.value);
                });
        }
    }