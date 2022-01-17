function (paper, cx, cy) {
        var e, x = cx - 75, y = cy;

        e = paper.path("M " + x + "," + y
                     + "c 0,0 75,60 150,0")
                 .attr({"stroke-width": "8px"});
    }