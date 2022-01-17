function redrawBrush() {
        if (filter && brush.empty())
            brush.extent(filter);

        var gBrush = g.select("g.brush");
        gBrush.call(brush.x(x));
        gBrush.selectAll("rect").attr("height", xAxisY());

        fadeDeselectedBars();
    }