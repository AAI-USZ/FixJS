function() {
        chart.resetSvg();

        if (chart.dataAreSet()) {
            chart.generateG();
            chart.renderAxisX(chart.g());
            chart.renderAxisY(chart.g());

            redrawLine();

            chart.renderBrush(chart.g());
        }

        return chart;
    }