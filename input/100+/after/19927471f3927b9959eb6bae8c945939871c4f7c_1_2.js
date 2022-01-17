function() {
            var camera = this.scene.getCamera();
            camera.position = this.defaultCamera.position;
            camera.direction = this.defaultCamera.direction;
            camera.up = this.defaultCamera.up;
            camera.transform = this.defaultCamera.transform;
            camera.frustum = this.defaultCamera.frustum.clone();

            var controllers = camera.getControllers();
            controllers.removeAll();
            this.centralBodyCameraController = controllers.addCentralBody();
        }