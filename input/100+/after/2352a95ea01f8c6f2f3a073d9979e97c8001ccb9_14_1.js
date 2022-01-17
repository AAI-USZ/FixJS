function(axis, angle) {
        var a = Cartesian3.clone(axis);
        var turnAngle = angle || this._moveRate;
        var rotation = Matrix3.fromQuaternion(Quaternion.fromAxisAngle(a, turnAngle));
        var direction = rotation.multiplyByVector(this._camera.direction);
        var up = rotation.multiplyByVector(this._camera.up);
        var right = rotation.multiplyByVector(this._camera.right);
        this._camera.direction = direction;
        this._camera.up = up;
        this._camera.right = right;
    }