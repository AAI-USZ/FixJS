function finalBarHeight(d) {
        return chart.yAxisHeight() - chart.y()(d.value) - BAR_PADDING_BOTTOM;
    }