function(movement) {
        var transform = this._transform;
        var camera = this._camera;
        var position = camera.position;
        var up = camera.up;
        var right = camera.right;
        var direction = camera.direction;

        var oldTransform = camera.transform;
        var oldEllipsoid = this._spindleController.getEllipsoid();
        var oldConstrainedZ = this._spindleController.constrainedAxis;

        this._spindleController.setReferenceFrame(transform, Ellipsoid.UNIT_SPHERE);
        this._spindleController.constrainedAxis = Cartesian3.UNIT_Z;

        var invTransform = camera.getInverseTransform();
        camera.position = invTransform.multiplyWithVector(new Cartesian4(position.x, position.y, position.z, 1.0)).getXYZ();
        camera.up = invTransform.multiplyWithVector(new Cartesian4(up.x, up.y, up.z, 0.0)).getXYZ();
        camera.right = invTransform.multiplyWithVector(new Cartesian4(right.x, right.y, right.z, 0.0)).getXYZ();
        camera.direction = invTransform.multiplyWithVector(new Cartesian4(direction.x, direction.y, direction.z, 0.0)).getXYZ();

        this._spindleController._rotate(movement);

        position = camera.position;
        up = camera.up;
        right = camera.right;
        direction = camera.direction;

        this._spindleController.setReferenceFrame(oldTransform, oldEllipsoid);
        this._spindleController.constrainedAxis = oldConstrainedZ;

        camera.position = transform.multiplyWithVector(new Cartesian4(position.x, position.y, position.z, 1.0)).getXYZ();
        camera.up = transform.multiplyWithVector(new Cartesian4(up.x, up.y, up.z, 0.0)).getXYZ();
        camera.right = transform.multiplyWithVector(new Cartesian4(right.x, right.y, right.z, 0.0)).getXYZ();
        camera.direction = transform.multiplyWithVector(new Cartesian4(direction.x, direction.y, direction.z, 0.0)).getXYZ();
    }