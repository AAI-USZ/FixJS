function() {
        slices.selectAll("text").remove();
        slicePaths = slicePaths.data(dataPie(chart.group().top(Infinity)));
        slicePaths.transition().duration(750)
            .attrTween("d", tweenPie);
        chart.drawLabels(slices, arc);
        return chart;
    }