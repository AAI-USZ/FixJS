function finalBarHeight(d) {
        return chart.yAxisHeight() - chart.y()(chart.valueFunction()(d)) - BAR_PADDING_BOTTOM;
    }