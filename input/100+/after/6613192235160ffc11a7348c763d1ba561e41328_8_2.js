function()
    {
        var camera = this._camera;
        var position = camera.position;
        var direction = camera.direction;
        var cameraPosition;

        var centerWC;
        var positionWC;

        if (direction.dot(Cartesian3.UNIT_Z) >= 0) {
            centerWC = Cartesian4.UNIT_W;
            this._transform.setColumn3(centerWC);

            cameraPosition = new Cartesian4(camera.position.x, camera.position.y, camera.position.z, 1.0);
            positionWC = camera.transform.multiplyWithVector(cameraPosition);

            camera.transform = this._transform.clone();
        } else {
            var scalar = -position.z / direction.z;
            var center = position.add(direction.multiplyWithScalar(scalar));
            center = new Cartesian4(center.x, center.y, center.z, 1.0);
            centerWC = camera.transform.multiplyWithVector(center);
            this._transform.setColumn3(centerWC);

            cameraPosition = new Cartesian4(camera.position.x, camera.position.y, camera.position.z, 1.0);
            positionWC = camera.transform.multiplyWithVector(cameraPosition);
            camera.transform = this._transform.clone();
        }

        var tanPhi = Math.tan(this._camera.frustum.fovy * 0.5);
        var tanTheta = this._camera.frustum.aspectRatio * tanPhi;
        var distToC = positionWC.subtract(centerWC).magnitude();
        var dWidth = tanTheta * distToC;
        var dHeight = tanPhi * distToC;

        var maxX = Math.max(dWidth - this._mapWidth, this._mapWidth);
        var maxY = Math.max(dHeight - this._mapHeight, this._mapHeight);

        if (positionWC.x < -maxX || positionWC.x > maxX || positionWC.y < -maxY || positionWC.y > maxY) {
            if (!this._translateHandler.isButtonDown()) {
                var translateX = centerWC.y < -maxX || centerWC.y > maxX;
                var translateY = centerWC.z < -maxY || centerWC.z > maxY;
                if ((translateX || translateY) && !this._lastInertiaTranslateMovement &&
                        !this._animationCollection.contains(this._translateAnimation)) {
                    this._addCorrectTranslateAnimation(Cartesian3.fromCartesian4(positionWC), Cartesian3.fromCartesian4(centerWC), maxX, maxY);
                }
            }

            maxX = maxX + this._mapWidth * 0.5;
            if (centerWC.y > maxX) {
                positionWC.y -= centerWC.y - maxX;
            } else if (centerWC.y < -maxX) {
                positionWC.y += -maxX - centerWC.y;
            }

            maxY = maxY + this._mapHeight * 0.5;
            if (centerWC.z > maxY) {
                positionWC.z -= centerWC.z - maxY;
            } else if (centerWC.z < -maxY) {
                positionWC.z += -maxY - centerWC.z;
            }
        }

        camera.position = Cartesian3.fromCartesian4(camera.getInverseTransform().multiplyWithVector(positionWC));
    }