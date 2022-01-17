function (paper, cx, cy, size, posY, flip) {
        var e, x = cx, y = cy - 10, scale = size + 0.5;

        e = paper.path("M " + x + "," + y
                     + "c 0,0 50,-30 0,30")
                 .attr({"stroke-width": 8});

        if (flip) {
            e.transform("t -24,0 s -" + scale + "," + scale);
        }
        else {
            e.transform("s " + scale + "," + scale);
        }
    }