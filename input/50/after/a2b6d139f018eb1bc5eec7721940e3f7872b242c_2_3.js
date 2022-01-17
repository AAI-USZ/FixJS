function finalBarY(d) {
        return chart.margins().top + chart.y()(chart.valueFunction()(d));
    }