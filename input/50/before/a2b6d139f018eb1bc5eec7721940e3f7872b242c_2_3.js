function finalBarY(d) {
        return chart.margins().top + chart.y()(d.value);
    }