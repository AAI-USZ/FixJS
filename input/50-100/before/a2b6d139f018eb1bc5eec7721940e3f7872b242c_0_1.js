function() {
        chart.resetSvg();

        if (chart.dataAreSet()) {
            g = chart.generateSvg().append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            renderAxisX();

            renderAxisY();

            redrawBars();

            renderBrush();
        }

        return chart;
    }