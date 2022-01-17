function() {
            var canvas = this.canvas, ellipsoid = this.ellipsoid, scene, widget = this;

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
                this.dayImageUrl = this.dayImageUrl || require.toUrl('Images/NE2_50M_SR_W_2048.jpg');
                this.nightImageUrl = this.nightImageUrl || require.toUrl('Images/land_ocean_ice_lights_512.jpg');
            } else {
                // Desktop
                this.dayImageUrl = this.dayImageUrl || require.toUrl('Images/NE2_50M_SR_W_4096.jpg');
                this.nightImageUrl = this.nightImageUrl || require.toUrl('Images/land_ocean_ice_lights_2048.jpg');
                this.specularMapUrl = this.specularMapUrl || require.toUrl('Images/earthspec1k.jpg');
                this.cloudsMapUrl = this.cloudsMapUrl || require.toUrl('Images/earthcloudmaptrans.jpg');
                this.bumpMapUrl = this.bumpMapUrl || require.toUrl('Images/earthbump1k.jpg');
            }

            var centralBody = this.centralBody = new CentralBody(ellipsoid);
            centralBody.showSkyAtmosphere = true;
            centralBody.showGroundAtmosphere = true;

            this._configureCentralBodyImagery();

            scene.getPrimitives().setCentralBody(centralBody);

            var camera = scene.getCamera(), maxRadii = ellipsoid.getRadii().getMaximumComponent();

            camera.position = camera.position.multiplyByScalar(1.5);
            camera.frustum.near = 0.0002 * maxRadii;
            camera.frustum.far = 50.0 * maxRadii;

            this.centralBodyCameraController = camera.getControllers().addCentralBody();

            var handler = new EventHandler(canvas);
            handler.setMouseAction(lang.hitch(this, '_handleLeftClick'), MouseEventType.LEFT_CLICK);
            handler.setMouseAction(lang.hitch(this, '_handleRightClick'), MouseEventType.RIGHT_CLICK);
            handler.setMouseAction(lang.hitch(this, '_handleMouseMove'), MouseEventType.MOVE);
            handler.setMouseAction(lang.hitch(this, '_handleLeftDown'), MouseEventType.LEFT_DOWN);
            handler.setMouseAction(lang.hitch(this, '_handleLeftUp'), MouseEventType.LEFT_UP);
            handler.setMouseAction(lang.hitch(this, '_handleWheel'), MouseEventType.WHEEL);
            handler.setMouseAction(lang.hitch(this, '_handleRightDown'), MouseEventType.RIGHT_DOWN);
            handler.setMouseAction(lang.hitch(this, '_handleRightUp'), MouseEventType.RIGHT_UP);

            //////////////////////////////////////////////////////////////////////////////////////////////////

            if (typeof this.onObjectRightClickSelected === 'undefined') {
                this.onObjectRightClickSelected = this.defaultOnObjectRightClickSelected;
            }

            if (this.enableDragDrop) {
                var dropBox = this.cesiumNode;
                on(dropBox, 'drop', lang.hitch(widget, 'handleDrop'));
                on(dropBox, 'dragenter', event.stop);
                on(dropBox, 'dragover', event.stop);
                on(dropBox, 'dragexit', event.stop);
            }

            var animationController = this.animationController;
            var dynamicObjectCollection = this.dynamicObjectCollection = new DynamicObjectCollection();
            var clock = this.clock;
            var transitioner = this.sceneTransitioner = new SceneTransitioner(scene);
            this.visualizers = VisualizerCollection.createCzmlStandardCollection(scene, dynamicObjectCollection);

            if (typeof widget.endUserOptions.source !== 'undefined') {
                getJson(widget.endUserOptions.source).then(function(czmlData) {
                    processCzml(czmlData, widget.dynamicObjectCollection, widget.endUserOptions.source);
                    widget.setTimeFromBuffer();
                },
                function(error) {
                    window.alert(error);
                });
            }

            if (typeof widget.endUserOptions.lookAt !== 'undefined') {
                widget.cameraCenteredObjectID = widget.endUserOptions.lookAt;
            }

            if (typeof widget.endUserOptions.stats !== 'undefined' && widget.endUserOptions.stats) {
                widget.enableStatistics(true);
            }

            this.lastTimeLabelUpdate = clock.currentTime;
            this.timeLabelElement = this.timeLabel.containerNode;
            this.timeLabelElement.innerHTML = clock.currentTime.toDate().toUTCString();

            this.updateSpeedIndicator();

            var animReverse = this.animReverse;
            var animPause = this.animPause;
            var animPlay = this.animPlay;

            on(this.animReset, 'Click', function() {
                animationController.reset();
                animReverse.set('checked', false);
                animPause.set('checked', true);
                animPlay.set('checked', false);
                widget.updateSpeedIndicator();
            });

            function onAnimPause() {
                animationController.pause();
                animReverse.set('checked', false);
                animPause.set('checked', true);
                animPlay.set('checked', false);
                widget.updateSpeedIndicator();
            }

            on(animPause, 'Click', onAnimPause);

            on(animReverse, 'Click', function() {
                animationController.playReverse();
                animReverse.set('checked', true);
                animPause.set('checked', false);
                animPlay.set('checked', false);
                widget.updateSpeedIndicator();
            });

            on(animPlay, 'Click', function() {
                animationController.play();
                animReverse.set('checked', false);
                animPause.set('checked', false);
                animPlay.set('checked', true);
                widget.updateSpeedIndicator();
            });

            on(widget.animSlow, 'Click', function() {
                animationController.slower();
                widget.updateSpeedIndicator();
            });

            on(widget.animFast, 'Click', function() {
                animationController.faster();
                widget.updateSpeedIndicator();
            });

            function onTimelineScrub(e) {
                widget.clock.currentTime = e.timeJulian;
                onAnimPause();
            }

            var timelineWidget = widget.timelineWidget;
            timelineWidget.clock = widget.clock;
            timelineWidget.setupCallback = function(t) {
                widget.timelineControl = t;
                t.addEventListener('settime', onTimelineScrub, false);
                t.zoomTo(clock.startTime, clock.stopTime);
            };
            timelineWidget.setupTimeline();

            var viewHomeButton = widget.viewHomeButton;
            var view2D = widget.view2D;
            var view3D = widget.view3D;
            var viewColumbus = widget.viewColumbus;
            var viewFullScreen = widget.viewFullScreen;

            view2D.set('checked', false);
            view3D.set('checked', true);
            viewColumbus.set('checked', false);

            on(viewFullScreen, 'Click', function() {
                if (FullScreen.isFullscreenEnabled()) {
                    FullScreen.exitFullscreen();
                } else {
                    FullScreen.requestFullScreen(document.body);
                }
            });

            on(viewHomeButton, 'Click', function() {
                view2D.set('checked', false);
                view3D.set('checked', true);
                viewColumbus.set('checked', false);
                transitioner.morphTo3D();
                widget.viewHome();
                widget.showSkyAtmosphere(true);
                widget.showGroundAtmosphere(true);
            });
            on(view2D, 'Click', function() {
                widget.cameraCenteredObjectID = undefined;
                view2D.set('checked', true);
                view3D.set('checked', false);
                viewColumbus.set('checked', false);
                widget.showSkyAtmosphere(false);
                widget.showGroundAtmosphere(false);
                transitioner.morphTo2D();
            });
            on(view3D, 'Click', function() {
                widget.cameraCenteredObjectID = undefined;
                view2D.set('checked', false);
                view3D.set('checked', true);
                viewColumbus.set('checked', false);
                transitioner.morphTo3D();
                widget.showSkyAtmosphere(true);
                widget.showGroundAtmosphere(true);
            });
            on(viewColumbus, 'Click', function() {
                widget.cameraCenteredObjectID = undefined;
                view2D.set('checked', false);
                view3D.set('checked', false);
                viewColumbus.set('checked', true);
                widget.showSkyAtmosphere(false);
                widget.showGroundAtmosphere(false);
                transitioner.morphToColumbusView();
            });

            var cbLighting = widget.cbLighting;
            on(cbLighting, 'Change', function(value) {
                widget.centralBody.affectedByLighting = !value;
            });

            var imagery = widget.imagery;
            var imageryAerial = widget.imageryAerial;
            var imageryAerialWithLabels = widget.imageryAerialWithLabels;
            var imageryRoad = widget.imageryRoad;
            var imagerySingleTile = widget.imagerySingleTile;
            var imageryOptions = [imageryAerial, imageryAerialWithLabels, imageryRoad, imagerySingleTile];
            var bingHtml = imagery.containerNode.innerHTML;

            function createImageryClickFunction(control, style) {
                return function() {
                    if (style) {
                        widget.setStreamingImageryMapStyle(style);
                        imagery.containerNode.innerHTML = bingHtml;
                    } else {
                        widget.enableStreamingImagery(false);
                        imagery.containerNode.innerHTML = 'Imagery';
                    }

                    imageryOptions.forEach(function(o) {
                        o.set('checked', o === control);
                    });
                };
            }

            on(imageryAerial, 'Click', createImageryClickFunction(imageryAerial, BingMapsStyle.AERIAL));
            on(imageryAerialWithLabels, 'Click', createImageryClickFunction(imageryAerialWithLabels, BingMapsStyle.AERIAL_WITH_LABELS));
            on(imageryRoad, 'Click', createImageryClickFunction(imageryRoad, BingMapsStyle.ROAD));
            on(imagerySingleTile, 'Click', createImageryClickFunction(imagerySingleTile, undefined));

            //////////////////////////////////////////////////////////////////////////////////////////////////

            if (typeof this.postSetup !== 'undefined') {
                this.postSetup(this);
            }

            this.defaultCamera = camera.clone();
        }