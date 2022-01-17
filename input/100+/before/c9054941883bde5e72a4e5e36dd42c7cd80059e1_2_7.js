function(angle, pixelsFromEdge) {
        var scaledRadius = graph.scaleVector(r);
        var scaledCenter = [0, 0]; //graph.scalePoint(center);
        var x = Math.sin((angle + 90) * Math.PI / 180) * (scaledRadius[0] + pixelsFromEdge) + scaledCenter[0];
        var y = Math.cos((angle + 90) * Math.PI / 180) * (scaledRadius[1] + pixelsFromEdge) + scaledCenter[1];
        return x + "," + y;
    }