function() {
        redrawBars();
        chart.redrawBrush(chart.g());
        if (chart.yElasticity())
            chart.renderYAxis(chart.g());
        return chart;
    }