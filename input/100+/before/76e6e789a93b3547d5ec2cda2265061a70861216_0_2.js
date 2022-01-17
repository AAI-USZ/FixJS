function vennIntersection(points, circles, sweeps, label) {
        var graph = KhanUtil.currentGraph;
        var set = graph.raphael.set();
        var pathString = vennIntersectionString (points, circles, sweeps);

        set.push(graph.label(getIntersectionCenter(points, circles, sweeps), '\\color{#555}{' +label+ '}'));

        var pathObject = graph.raphael.path(pathString);
        set.push(pathObject);
        var bbox = pathObject.getBBox();
        pathObject.attr({fill: '#aaa', 'fill-opacity': 0.1, stroke: 0, 'stroke-fill': "transparent"});
        pathObject.hover(function(){
            this.animate({'fill-opacity': 0.5}, 200);
        },
        function(){
            this.animate({'fill-opacity': 0.1}, 200);
        }
        );
        return pathObject;
    }