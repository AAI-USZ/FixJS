function(axis, angle) {
        var a = Cartesian3.clone(axis);
        var turnAngle = (typeof angle !== 'undefined') ? angle : this._moveRate;
        var rotation = Quaternion.fromAxisAngle(a, turnAngle).toRotationMatrix();

        var camera = this._camera;
        camera.position = rotation.multiplyByVector(camera.position);
        camera.direction = rotation.multiplyByVector(camera.direction);
        camera.up = rotation.multiplyByVector(camera.up);
        camera.right = camera.direction.cross(camera.up);
    }