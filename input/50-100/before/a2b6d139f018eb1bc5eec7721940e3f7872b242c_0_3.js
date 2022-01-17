function finalBarWidth() {
        var w = Math.floor(chart.axisXLength() / xUnits(x.domain()[0], x.domain()[1]).length);
        if (isNaN(w) || w < MIN_BAR_WIDTH)
            w = MIN_BAR_WIDTH;
        return w;
    }