function(_) {
        if (_) {
            filter = _;
            brush.extent(_);
            chart.dimension().filterRange(_);
            chart.turnOnReset();
        } else {
            filter = null;
            brush.clear();
            chart.dimension().filterAll();
            chart.turnOffReset();
        }

        return chart;
    }