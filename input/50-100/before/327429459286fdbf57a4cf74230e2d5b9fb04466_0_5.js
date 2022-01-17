function (paper, cx, cy, size, posY, flip) {
        // Do variable sized nose and mirroring randomly after I figure out how to not kill the stroke width when applying a transformation

        var e, x = cx, y = cy - 10;

        e = paper.path("M " + x + "," + y
                     + "c 0,0 50,-30 0,30")
                 .attr({"stroke-width": "8px"});

        if (flip) {
            e.transform("m -1 0 0 1 " + (x * 2) + " 0"); // e.transform("s -1,1");
        }
    }