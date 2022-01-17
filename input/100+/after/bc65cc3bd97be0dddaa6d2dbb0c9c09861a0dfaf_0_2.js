function(currentTime) {
            var cameraCenteredObjectID = this.cameraCenteredObjectID;
            var cameraCenteredObjectIDPosition = this._cameraCenteredObjectIDPosition;

            this.timelineControl.updateFromClock();
            this.scene.setSunPosition(SunPosition.compute(currentTime).position);
            this.visualizers.update(currentTime);

            if ((Math.abs(currentTime.getSecondsDifference(this._lastTimeLabelClock)) >= 1.0) ||
                    ((Date.now() - this._lastTimeLabelDate) > 200)) {
                this.timeLabelElement.innerHTML = currentTime.toDate().toUTCString();
                this._lastTimeLabelClock = currentTime;
                this._lastTimeLabelDate = Date.now();
            }

            // Update the camera to stay centered on the selected object, if any.
            if (cameraCenteredObjectID) {
                var dynamicObject = this.dynamicObjectCollection.getObject(cameraCenteredObjectID);
                if (dynamicObject && dynamicObject.position) {
                    cameraCenteredObjectIDPosition = dynamicObject.position.getValueCartesian(currentTime, cameraCenteredObjectIDPosition);
                    if (typeof cameraCenteredObjectIDPosition !== 'undefined') {
                        // If we're centering on an object for the first time, zoom to within 2km of it.
                        if (this._lastCameraCenteredObjectID !== cameraCenteredObjectID) {
                            var camera = this.scene.getCamera();
                            camera.position = camera.position.normalize().multiplyByScalar(5000.0);

                            var controllers = camera.getControllers();
                            controllers.removeAll();
                            this.objectSpindleController = controllers.addSpindle();
                            this.objectSpindleController.constrainedAxis = Cartesian3.UNIT_Z;
                        }

                        if (typeof spindleController !== 'undefined' && !this.objectSpindleController.isDestroyed()) {
                            var transform = Transforms.eastNorthUpToFixedFrame(cameraCenteredObjectIDPosition, this.ellipsoid);
                            this.objectSpindleController.setReferenceFrame(transform, Ellipsoid.UNIT_SPHERE);
                        }
                    }
                }
            }
            this._lastCameraCenteredObjectID = cameraCenteredObjectID;
        }