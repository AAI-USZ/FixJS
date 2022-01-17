function onClick(d) {
        chart.filter(chart.keyFunction()(d.data));
        dc.redrawAll();
    }