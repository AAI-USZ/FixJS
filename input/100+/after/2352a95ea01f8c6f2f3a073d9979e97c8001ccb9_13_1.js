function(ellipsoid, altitude, endPoint, duration) {
        var start = this._camera.position;

        var maxStartAlt = ellipsoid.getMaximumRadius() + altitude;
        var dot = start.normalize().dot(endPoint.normalize());

        var abovePercentage, incrementPercentage;
        var startAboveMaxAlt = (start.magnitude() > maxStartAlt);
        if (startAboveMaxAlt) {
            abovePercentage = 0.6;
            incrementPercentage = 0.35;
        } else {
            // TODO: revisit when hi-res imagery is implemented.
            abovePercentage = Math.max(0.1, 1.0 - Math.abs(dot));
            incrementPercentage = 0.5;
        }

        maxStartAlt = ellipsoid.getMaximumRadius() + abovePercentage * altitude;

        var aboveEnd = endPoint.normalize().multiplyByScalar(maxStartAlt);
        var afterStart = start.normalize().multiplyByScalar(maxStartAlt);

        var points, axis, angle, rotation;
        if (start.magnitude() > maxStartAlt && dot > 0) {
            var middle = start.subtract(aboveEnd).multiplyByScalar(0.5).add(aboveEnd);

            points = [{
                point : start
            }, {
                point : middle
            }, {
                point : aboveEnd
            }, {
                point : endPoint
            }];
        } else {
            points = [{
                point : start
            }];

            angle = Math.acos(afterStart.normalize().dot(aboveEnd.normalize()));
            axis = aboveEnd.cross(afterStart);

            var increment = incrementPercentage * angle;
            var startCondition = (startAboveMaxAlt) ? angle - increment : angle;
            for ( var i = startCondition; i > 0.0; i = i - increment) {
                rotation = Matrix3.fromQuaternion(Quaternion.fromAxisAngle(axis, i));
                points.push({
                    point : rotation.multiplyByVector(aboveEnd)
                });
            }

            points.push({
                point : aboveEnd
            }, {
                point : endPoint
            });
        }

        var scalar = duration / (points.length - 1);
        for ( var k = 0; k < points.length; ++k) {
            points[k].time = k * scalar;
        }

        return new HermiteSpline(points);
    }