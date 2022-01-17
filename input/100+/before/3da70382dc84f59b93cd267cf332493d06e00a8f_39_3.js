function(projection, billboards) {
        var length = billboards.length;

        for ( var i = 0; i < length; ++i) {
            var b = billboards[i];
            var p = this.modelMatrix.multiplyWithVector(new Cartesian4(b.getPosition().x, b.getPosition().y, b.getPosition().z, 1.0));
            var projectedPoint = projection.project(projection.getEllipsoid().toCartographic3(new Cartesian3(p.x, p.y, p.z)));
            b._setActualPosition({
                x : projectedPoint.z,
                y : projectedPoint.x,
                z : projectedPoint.y
            });
        }
    }