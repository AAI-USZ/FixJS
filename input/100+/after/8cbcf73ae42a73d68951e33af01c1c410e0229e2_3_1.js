function (modelViewProjectionMatrix, viewportTransformation, point) {
            if (typeof modelViewProjectionMatrix === 'undefined') {
                throw new DeveloperError('modelViewProjectionMatrix is required.');
            }

            if (typeof viewportTransformation === 'undefined') {
                throw new DeveloperError('viewportTransformation is required.');
            }

            if (typeof point === 'undefined') {
                throw new DeveloperError('point is required.');
            }

            var pnt = new Cartesian4(point.x, point.y, point.z, 1.0);
            pnt = modelViewProjectionMatrix.multiplyWithVector(pnt);
            pnt = pnt.multiplyWithScalar(1.0 / pnt.w);
            pnt = viewportTransformation.multiplyWithVector(pnt);
            return Cartesian2.fromCartesian4(pnt);
        }