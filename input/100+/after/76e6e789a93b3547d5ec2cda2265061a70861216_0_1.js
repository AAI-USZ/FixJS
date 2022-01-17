function drawVenn(labels, data) {
        var graph = KhanUtil.currentGraph;
        var set = graph.raphael.set();
        var height = graph.raphael.height;
        var defRad = height/2;


        var c =[];
        c[0] = {r: Math.sqrt(data[0] + data[3] + data[4] + data[6])/2};
        c[1] = {r: Math.sqrt(data[1] + data[3] + data[5] + data[6])/2};
        c[2] = {r: Math.sqrt(data[2] + data[4] + data[5] + data[6])/2};

        c[0].x = c[0].r + 1;
        c[0].y = c[0].r + 1;
        c[1].x = c[0].r + c[1].r + 1;
        c[1].y = c[0].r + 1;
        c[2].x = c[0].r + c[2].r/2 + 1;
        c[2].y = c[0].r + c[2].r + 1;

        drawIntersections(c, data);

        $.each(c, function(i, circle) {
            set.push(graph.circle([circle.x, circle.y],circle.r, {
                stroke: COLORS[i],
                'stroke-width': 3,
                fill: "none"
            }));
        });


        var lCenter =[];
        lCenter[0] = [c[0].x - c[0].r, c[0].y - c[0].r];
        lCenter[1] = [c[1].x + c[1].r, c[1].y - c[1].r];
        lCenter[2] = [c[2].x + c[2].r, c[2].y + c[2].r];

        $.each(labels, function(i, label) {
            set.push(graph.label(lCenter[i],"\\color{"+ COLORS[i] +"}{" + label +"}"));
        });

        var labelPos = [];
        labelPos.push([c[0].x - c[0].r/2, c[0].y - c[0].r/2]);
        labelPos.push([c[1].x + c[1].r/2, c[1].y - c[1].r/2]);
        labelPos.push([c[2].x, c[2].y + c[2].r/2]);

        $.each(labelPos, function(i, pos) {
            set.push(graph.label(pos,"\\color{#333}{" + data[i] +"}"));
        });
    }