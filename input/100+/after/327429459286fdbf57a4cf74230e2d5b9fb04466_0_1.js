function (paper, lr, cx, cy, angle) {
        var x = cx, y = cy + 20;

        paper.path("M " + x + "," + y
                 + "a 30,20 0 1 1 0.1,0")
             .attr({"stroke-width": 6})
             .transform("r" + (lr === "l" ? angle : -angle));

        paper.path("M " + x + "," + (y - 12)
                 + "a 12,8 0 1 1 0.1,0")
             .attr({"stroke-width": 0,
                    fill: "#000"})
             .transform("r" + (lr === "l" ? angle : -angle));
    }