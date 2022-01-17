function() {
        var position = this._position;
        var positionChanged = !position.equals(this.position);
        if (positionChanged) {
            position = this._position = this.position.clone();
        }

        var direction = this._direction;
        var directionChanged = !direction.equals(this.direction);
        if (directionChanged) {
            direction = this._direction = this.direction.clone();
        }

        var up = this._up;
        var upChanged = !up.equals(this.up);
        if (upChanged) {
            up = this._up = this.up.clone();
        }

        var right = this._right;
        var rightChanged = !right.equals(this.right);
        if (rightChanged) {
            right = this._right = this.right.clone();
        }

        var transform = this._transform;
        var transformChanged = !transform.equals(this.transform);
        if (transformChanged) {
            transform = this._transform = this.transform.clone();

            this._invTransform = this._transform.inverseTransformation();
        }

        if (positionChanged || transformChanged) {
            this._positionWC = transform.multiplyWithVector(new Cartesian4(position.x, position.y, position.z, 1.0)).getXYZ();
        }

        if (directionChanged || transformChanged) {
            this._directionWC = transform.multiplyWithVector(new Cartesian4(direction.x, direction.y, direction.z, 0.0)).getXYZ();
        }

        if (upChanged || transformChanged) {
            this._upWC = transform.multiplyWithVector(new Cartesian4(up.x, up.y, up.z, 0.0)).getXYZ();
        }

        if (rightChanged || transformChanged) {
            this._rightWC = transform.multiplyWithVector(new Cartesian4(right.x, right.y, right.z, 0.0)).getXYZ();
        }

        if (positionChanged || directionChanged || upChanged || transformChanged) {
            this._planes = this.frustum.getPlanes(this._positionWC, this._directionWC, this._upWC);
        }

        if (directionChanged || upChanged || rightChanged) {
            var det = direction.dot(up.cross(right));
            if (Math.abs(1.0 - det) > CesiumMath.EPSILON2) {
                //orthonormalize axes
                direction = this._direction = direction.normalize();
                this.direction = direction.clone();

                var invUpMag = 1.0 / up.magnitudeSquared();
                var scalar = up.dot(direction) * invUpMag;
                var w0 = direction.multiplyWithScalar(scalar);
                up = this._up = up.subtract(w0).normalize();
                this.up = up.clone();

                right = this._right = direction.cross(up);
                this.right = right.clone();
            }
        }

        if (positionChanged || directionChanged || upChanged || rightChanged || transformChanged) {
            this._updateViewMatrix();
        }
    }