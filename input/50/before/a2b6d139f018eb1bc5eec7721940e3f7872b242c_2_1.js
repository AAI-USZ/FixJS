function() {
        redrawBars();
        chart.redrawBrush(chart.g());
        if (chart.elasticAxisY())
            chart.renderAxisY(chart.g());
        return chart;
    }