function(v0, v1, axis, angle) {
        var rotation = Matrix3.fromQuaternion(Quaternion.fromAxisAngle(axis, angle));
        var u0 = rotation.multiplyByVector(v0);
        var u1 = rotation.multiplyByVector(v1);
        return [u0, u1];
    }