function finalBarHeight(d) {
        return yAxisHeight() - y(d.value) - BAR_PADDING_BOTTOM;
    }