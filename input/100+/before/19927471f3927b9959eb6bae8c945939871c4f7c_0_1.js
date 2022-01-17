function(widget) {
            var currentTime = animating ? clock.tick() : clock.currentTime;

            if (typeof timeline !== 'undefined') {
                timeline.updateFromClock();
            }
            visualizers.update(currentTime);

            if (Math.abs(currentTime.getSecondsDifference(lastTimeLabelUpdate)) >= 1.0) {
                timeLabel.innerHTML = currentTime.toDate().toUTCString();
                lastTimeLabelUpdate = currentTime;
            }

            // Update the camera to stay centered on the selected object, if any.
            if (cameraCenteredObjectID) {
                var dynamicObject = dynamicObjectCollection.getObject(cameraCenteredObjectID);
                if (dynamicObject && dynamicObject.position) {
                    cameraCenteredObjectIDPosition = dynamicObject.position.getValueCartesian(currentTime, cameraCenteredObjectIDPosition);
                    if (typeof cameraCenteredObjectIDPosition !== 'undefined') {
                        // If we're centering on an object for the first time, zoom to within 2km of it.
                        if (lastCameraCenteredObjectID !== cameraCenteredObjectID) {
                            lastCameraCenteredObjectID = cameraCenteredObjectID;
                            var camera = widget.scene.getCamera();
                            camera.position = camera.position.normalize().multiplyWithScalar(5000.0);
                        }

                        var transform = Transforms.eastNorthUpToFixedFrame(cameraCenteredObjectIDPosition, widget.ellipsoid);
                        this.spindleCameraController.setReferenceFrame(transform, Ellipsoid.UNIT_SPHERE);
                    }
                }
            }
        }