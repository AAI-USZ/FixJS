function brushing(p) {
        var extent = _brush.extent();
        if (chart.round()) {
            extent[0] = extent.map(chart.round())[0];
            extent[1] = extent.map(chart.round())[1];
            _g.select(".brush")
                .call(_brush.extent(extent));
        }
        chart.filter([_brush.extent()[0], _brush.extent()[1]]);
        dc.redrawAll();
    }