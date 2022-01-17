function (paper, cx, cy, size, posY, flip) {
        var e, x = cx - 30, y = cy, scale = size + 0.5;

        e = paper.path("M " + x + "," + y
                     + "l 30,30"
                     + "l 30,-30")
                 .attr({"stroke-width": 8})
                 .transform("s " + scale + "," + scale);
    }