function finalBarX(d) {
        return chart.x()(chart.keyFunction()(d)) + chart.margins().left;
    }