function (paper, lr, cx, cy) {
        var e, x = cx - 30, y = cy;

        if (lr === "l") {
            e = paper.path("M " + x + "," + y
                         + "c 0,0 -3,-30 60,0");
        } else {
            e = paper.path("M " + x + "," + y
                         + "c 0,0 63,-30 60,0");
        }

        e.attr({"stroke-width": 8});
    }