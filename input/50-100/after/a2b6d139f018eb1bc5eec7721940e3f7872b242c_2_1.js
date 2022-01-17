function() {
        chart.resetSvg();

        if (chart.dataAreSet()) {
            chart.generateG();
            chart.renderXAxis(chart.g());
            chart.renderYAxis(chart.g());

            redrawBars();

            chart.renderBrush(chart.g());
        }

        return chart;
    }