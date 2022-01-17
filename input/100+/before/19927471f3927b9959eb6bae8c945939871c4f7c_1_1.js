function() {
            var canvas = this.canvas, ellipsoid = this.ellipsoid, scene;

            try {
                scene = this.scene = new Scene(canvas);
            } catch (ex) {
                if (typeof this.onSetupError !== 'undefined') {
                    this.onSetupError(this, ex);
                }
                return;
            }

            this.resize();

            on(canvas, 'contextmenu', event.stop);
            on(canvas, 'selectstart', event.stop);

            var maxTextureSize = scene.getContext().getMaximumTextureSize();
            if (maxTextureSize < 4095) {
                // Mobile, or low-end card
                this.dayImageUrl = this.dayImageUrl || require.toUrl('Images//NE2_50M_SR_W_1024.jpg');
                this.nightImageUrl = this.nightImageUrl || require.toUrl('Images//land_ocean_ice_lights_512.jpg');
            } else {
                // Desktop
                this.dayImageUrl = this.dayImageUrl || require.toUrl('Images//NE2_50M_SR_W_4096.jpg');
                this.nightImageUrl = this.nightImageUrl || require.toUrl('Images//land_ocean_ice_lights_2048.jpg');
                this.specularMapUrl = this.specularMapUrl || require.toUrl('Images//earthspec1k.jpg');
                this.cloudsMapUrl = this.cloudsMapUrl || require.toUrl('Images//earthcloudmaptrans.jpg');
                this.bumpMapUrl = this.bumpMapUrl || require.toUrl('Images//earthbump1k.jpg');
            }

            var centralBody = this.centralBody = new CentralBody(ellipsoid);
            centralBody.showSkyAtmosphere = true;
            centralBody.showGroundAtmosphere = true;

            this._configureCentralBodyImagery();

            scene.getPrimitives().setCentralBody(centralBody);

            var camera = scene.getCamera(), maxRadii = ellipsoid.getRadii().getMaximumComponent();

            camera.position = camera.position.multiplyWithScalar(1.5);
            camera.frustum.near = 0.0002 * maxRadii;
            camera.frustum.far = 50.0 * maxRadii;

            this.spindleCameraController = camera.getControllers().addSpindle(ellipsoid);
            this.spindleCameraController.mouseConstrainedZAxis = true;
            this.freelookCameraController = camera.getControllers().addFreeLook(ellipsoid);

            var handler = new EventHandler(canvas);
            handler.setMouseAction(lang.hitch(this, '_handleLeftClick'), MouseEventType.LEFT_CLICK);
            handler.setMouseAction(lang.hitch(this, '_handleRightClick'), MouseEventType.RIGHT_CLICK);
            handler.setMouseAction(lang.hitch(this, '_handleMouseMove'), MouseEventType.MOVE);
            handler.setMouseAction(lang.hitch(this, '_handleLeftDown'), MouseEventType.LEFT_DOWN);
            handler.setMouseAction(lang.hitch(this, '_handleLeftUp'), MouseEventType.LEFT_UP);
            handler.setMouseAction(lang.hitch(this, '_handleWheel'), MouseEventType.WHEEL);
            handler.setMouseAction(lang.hitch(this, '_handleRightDown'), MouseEventType.RIGHT_DOWN);
            handler.setMouseAction(lang.hitch(this, '_handleRightUp'), MouseEventType.RIGHT_UP);

            if (typeof this.postSetup !== 'undefined') {
                this.postSetup(this);
            }

            this.defaultCamera = camera.clone();

            this.render();
        }