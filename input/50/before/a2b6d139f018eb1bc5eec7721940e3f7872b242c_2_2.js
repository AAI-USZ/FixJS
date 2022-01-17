function finalBarX(d) {
        return chart.x()(d.key) + chart.margins().left;
    }