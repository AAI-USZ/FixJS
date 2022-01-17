function finalBarWidth() {
        var w = Math.floor(chart.xAxisLength() / chart.xUnits()(chart.x().domain()[0], chart.x().domain()[1]).length);
        if (isNaN(w) || w < MIN_BAR_WIDTH)
            w = MIN_BAR_WIDTH;
        return w;
    }