function(polyline){
        if(this.mode === SceneMode.SCENE3D){
            return polyline.getPositions().length;
        }
        var ellipsoid = this.ellipsoid;
        var positions = polyline.getPositions();
        var segments = PolylinePipeline.wrapLongitude(ellipsoid, positions);
        polyline._segments = segments;
        var numberOfSegments = segments.length;
        var length = 0;
        for ( var i = 0; i < numberOfSegments; ++i) {
            var segment = segments[i];
            var segmentLength = segment.length;
            var startN = ((i === 0) || (segmentLength === 2)) ? 0 : 1;
            length += segmentLength - startN;
        }
        return length;
    }