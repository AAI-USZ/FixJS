function(m, x, b, maxExtent){
        var xBoundary;
        var candidateY = m*x+b;
        if(candidateY>maxExtent.top){
            xBoundary = (90-b)/m;
        } else if(candidateY<maxExtent.bottom){
            xBoundary = (-90-b)/m;
        } else {
            xBoundary = x;
        }
        return new OpenLayers.Geometry.Point(xBoundary, m*xBoundary+b);
    }