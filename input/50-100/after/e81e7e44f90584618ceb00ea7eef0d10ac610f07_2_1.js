function fadeDeselectedBars() {
        if (!brush.empty() && brush.extent() != null) {
            var start = brush.extent()[0];
            var end = brush.extent()[1];

            bars.classed("deselected", function(d) {
                return d.key <= start || d.key >= end;
            });
        }
    }