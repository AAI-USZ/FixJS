function (paper, lr, cx, cy, angle) {
        var x = cx, y = cy + 20;

        paper.path("M " + x + "," + (y - 7)
                 + "a 20,15 0 1 1 0.1,0")
             .attr({"stroke-width": 0,
                    fill: "#000"})
             .transform("r" + (lr === "l" ? angle : -angle));
    }