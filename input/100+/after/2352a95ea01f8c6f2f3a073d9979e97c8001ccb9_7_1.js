function _computeEllipseQuadrant(cb, cbRadius, aSqr, bSqr, ab, ecc, mag, unitPos, eastVec, northVec, bearing,
                                     thetaPts, thetaPtsIndex, offset, clockDir, ellipsePts, ellipsePtsIndex, numPts) {
        var angle;
        var theta;
        var radius;
        var azimuth;
        var temp;
        var temp2;
        var rotAxis;
        var tempVec;

        for (var i = 0; i < numPts; i++, thetaPtsIndex += clockDir, ++ellipsePtsIndex) {
            theta = (clockDir > 0) ? (thetaPts[thetaPtsIndex] + offset) : (offset - thetaPts[thetaPtsIndex]);

            azimuth = theta + bearing;

            temp = -Math.cos(azimuth);

            rotAxis = eastVec.multiplyByScalar(temp);

            temp = Math.sin(azimuth);
            tempVec = northVec.multiplyByScalar(temp);

            rotAxis = rotAxis.add(tempVec);

            temp = Math.cos(theta);
            temp = temp * temp;

            temp2 = Math.sin(theta);
            temp2 = temp2 * temp2;

            radius = ab / Math.sqrt(bSqr * temp + aSqr * temp2);
            angle = radius / cbRadius;

            // Create the quaternion to rotate the position vector to the boundary of the ellipse.
            temp = Math.sin(angle / 2.0);

            var unitQuat = (new Quaternion(rotAxis.x * temp, rotAxis.y * temp, rotAxis.z * temp, Math.cos(angle / 2.0))).normalize();
            var rotMtx = Matrix3.fromQuaternion(unitQuat);

            var tmpEllipsePts = rotMtx.multiplyByVector(unitPos);
            var unitCart = tmpEllipsePts.normalize();
            tmpEllipsePts = unitCart.multiplyByScalar(mag);
            ellipsePts[ellipsePtsIndex] = tmpEllipsePts;
        }
    }