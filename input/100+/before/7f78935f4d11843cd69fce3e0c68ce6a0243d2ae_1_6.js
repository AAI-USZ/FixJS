function(polyline){
        if(this.mode == SceneMode.SCENE3D){
            return polyline.getPositions();
        }
        var ellipsoid = this.ellipsoid;
        var projection = this.projection;
        var newPositions = [];
        var modelMatrix = this.modelMatrix;
        var segments = polyline._segments;
        var numberOfSegments = segments.length;

        for ( var i = 0; i < numberOfSegments; ++i) {
            var segment = segments[i];
            var segmentLength = segment.length;
            var startN = ((i === 0) || (segmentLength === 2)) ? 0 : 1;
            for ( var n = startN; n < segmentLength; ++n) {
                var position = segment[n].cartesian;
                var p = modelMatrix.multiplyWithVector(new Cartesian4(position.x, position.y, position.z, 1.0));
                newPositions.push(projection.project(ellipsoid.toCartographic3(p.getXYZ())));
            }
        }
        return newPositions;
    }