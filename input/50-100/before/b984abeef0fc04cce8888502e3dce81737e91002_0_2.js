function() {
        slicePaths = slicePaths.data(dataPie(chart.group().top(Infinity)));
        dc.transition(slicePaths, chart)
            .attrTween("d", tweenPie);
        labels = labels.data(dataPie(chart.group().top(Infinity)));
        redrawLabels(arc);
        return chart;
    }