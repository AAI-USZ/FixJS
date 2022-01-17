function(axis, angle) {
        var a = Cartesian3.clone(axis);
        var turnAngle = (typeof angle !== 'undefined') ? angle : this._moveRate;
        var rotation = Matrix3.fromQuaternion(Quaternion.fromAxisAngle(a, turnAngle));

        var camera = this._camera;
        camera.position = rotation.multiplyByVector(camera.position);
        camera.direction = rotation.multiplyByVector(camera.direction);
        camera.up = rotation.multiplyByVector(camera.up);
        camera.right = camera.direction.cross(camera.up);
    }