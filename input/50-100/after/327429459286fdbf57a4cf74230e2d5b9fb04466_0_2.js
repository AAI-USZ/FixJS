function (paper, lr, cx, cy, angle) {
        var x = cx - 30, y = cy;

        paper.path("M " + x + "," + y
                 + "h 60")
             .attr({"stroke-width": 8})
             .transform("r" + (lr === "l" ? angle : -angle));
    }