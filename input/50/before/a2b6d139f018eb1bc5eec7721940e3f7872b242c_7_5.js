function onClick(d) {
        chart.filter(d.data.key);
        dc.redrawAll();
    }