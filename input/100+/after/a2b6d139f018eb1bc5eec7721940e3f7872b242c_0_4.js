function fadeDeselectedBars() {
        if (!chart.brush().empty() && chart.brush().extent() != null) {
            var start = chart.brush().extent()[0];
            var end = chart.brush().extent()[1];

            bars.classed("deselected", function(d) {
                var xValue = chart.keyFunction()(d);
                return xValue < start || xValue >= end;
            });
        } else {
            bars.classed("deselected", false);
        }
    }