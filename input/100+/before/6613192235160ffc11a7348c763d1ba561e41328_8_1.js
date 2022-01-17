function(movement) {
        var camera = this._camera;
        var sign = (camera.direction.dot(Cartesian3.UNIT_Z) >= 0) ? 1.0 : -1.0;

        var startRay = camera.getPickRay(movement.startPosition);
        var endRay = camera.getPickRay(movement.endPosition);

        var position = new Cartesian4(startRay.origin.x, startRay.origin.y, startRay.origin.z, 1.0);
        position = camera.getInverseTransform().multiplyWithVector(position).getXYZ();
        var direction = new Cartesian4(startRay.direction.x, startRay.direction.y, startRay.direction.z, 0.0);
        direction = camera.getInverseTransform().multiplyWithVector(direction).getXYZ();
        var scalar = sign * position.z / direction.z;
        var startPlanePos = position.add(direction.multiplyWithScalar(scalar));

        position = new Cartesian4(endRay.origin.x, endRay.origin.y, endRay.origin.z, 1.0);
        position = camera.getInverseTransform().multiplyWithVector(position).getXYZ();
        direction = new Cartesian4(endRay.direction.x, endRay.direction.y, endRay.direction.z, 0.0);
        direction = camera.getInverseTransform().multiplyWithVector(direction).getXYZ();
        scalar = sign * position.z / direction.z;
        var endPlanePos = position.add(direction.multiplyWithScalar(scalar));

        var diff = startPlanePos.subtract(endPlanePos);
        camera.position = camera.position.add(diff);
    }