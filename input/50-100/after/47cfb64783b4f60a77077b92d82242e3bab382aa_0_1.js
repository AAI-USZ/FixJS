function() {
        slicePaths = slicePaths.data(dataPie(chart.group().top(Infinity)));
        slicePaths.transition().duration(750)
            .attrTween("d", tweenPie);
        labels = labels.data(dataPie(chart.group().top(Infinity)));
        redrawLabels(arc);
        return chart;
    }