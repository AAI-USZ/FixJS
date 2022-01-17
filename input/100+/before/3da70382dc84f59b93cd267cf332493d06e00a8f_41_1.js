function(canvas, camera, projection) {
        if (typeof canvas === 'undefined') {
            throw new DeveloperError('canvas is required.');
        }

        if (typeof camera === 'undefined') {
            throw new DeveloperError('camera is required.');
        }

        if (typeof projection === 'undefined') {
            throw new DeveloperError('projection is required.');
        }

        this._canvas = canvas;
        this._camera = camera;
        this._projection = projection;
        this._zoomRate = 100000.0;
        this._moveRate = 100000.0;

        /**
         * A parameter in the range <code>[0, 1)</code> used to determine how long
         * the camera will continue to translate because of inertia.
         * With value of zero, the camera will have no inertia.
         *
         * @type Number
         */
        this.inertiaTranslate = 0.9;

        /**
         * A parameter in the range <code>[0, 1)</code> used to determine how long
         * the camera will continue to zoom because of inertia.
         * With value of zero, the camera will have no inertia.
         *
         * @type Number
         */
        this.inertiaZoom = 0.8;

        this._zoomFactor = 1.5;
        this._translateFactor = 1.0;
        this._minimumZoomRate = 20.0;
        this._maximumZoomRate = FAR;

        this._translateHandler = new CameraEventHandler(canvas, CameraEventType.LEFT_DRAG);
        this._zoomHandler = new CameraEventHandler(canvas, CameraEventType.RIGHT_DRAG);
        this._zoomWheel = new CameraEventHandler(canvas, CameraEventType.WHEEL);
        this._twistHandler = new CameraEventHandler(canvas, CameraEventType.MIDDLE_DRAG);

        this._lastInertiaZoomMovement = undefined;
        this._lastInertiaTranslateMovement = undefined;
        this._lastInertiaWheelZoomMovement = undefined;

        this._frustum = this._camera.frustum.clone();
        this._animationCollection = new AnimationCollection();
        this._zoomAnimation = undefined;
        this._translateAnimation = undefined;

        var maxZoomOut = 2.0;
        this._frustum.right *= maxZoomOut;
        this._frustum.left *= maxZoomOut;
        this._frustum.top *= maxZoomOut;
        this._frustum.bottom *= maxZoomOut;

        this._maxCoord = projection.project(new Cartographic3(Math.PI, CesiumMath.PI_OVER_TWO, 0.0));

        this._maxZoomFactor = 2.5;
        this._maxTranslateFactor = 1.5;
    }