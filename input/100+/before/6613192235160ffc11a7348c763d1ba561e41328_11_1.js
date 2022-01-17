function(camera, transform) {
        var pos = new Cartesian4(camera.position.x, camera.position.y, camera.position.z, 1.0);
        var dir = new Cartesian4(camera.direction.x, camera.direction.y, camera.direction.z, 0.0);
        var up = new Cartesian4(camera.up.x, camera.up.y, camera.up.z, 0.0);

        var frame = transform.inverseTransformation().multiplyWithMatrix(camera.transform);
        camera.transform = transform.clone();

        camera.position = frame.multiplyWithVector(pos).getXYZ();
        camera.direction = frame.multiplyWithVector(dir).getXYZ();
        camera.up = frame.multiplyWithVector(up).getXYZ();
        camera.right = camera.direction.cross(camera.up);
    }