function() {
        chart.resetSvg();

        if (chart.dataAreSet()) {
            chart.generateG();

            redrawLine();

            chart.renderXAxis(chart.g());
            chart.renderYAxis(chart.g());

            chart.renderBrush(chart.g());
        }

        return chart;
    }