function(duration, onComplete) {
        var scene = this._scene;

        var that = this;

        var camera = scene.getCamera();
        this._changeCameraTransform(camera, Matrix4.IDENTITY);

        var startPos = camera.position;
        var startDir = camera.direction;
        var startUp = camera.up;

        var maxRadii = this._ellipsoid.getMaximumRadius();
        var endPos = this._ellipsoid.cartographicToCartesian(new Cartographic(0.0, 0.0, 10.0));
        endPos = endPos.normalize().multiplyWithScalar(2.0 * maxRadii);
        var endDir = Cartesian3.ZERO.subtract(endPos).normalize();
        var endRight = endDir.cross(Cartesian3.UNIT_Z).normalize();
        var endUp = endRight.cross(endDir);

        var update = function(value) {
            camera.position = that._columbusViewMorph(startPos, endPos, value.time);
            camera.direction = that._columbusViewMorph(startDir, endDir, value.time);
            camera.up = that._columbusViewMorph(startUp, endUp, value.time);
            camera.right = camera.direction.cross(camera.up);
        };

        var animation = scene.getAnimations().add({
            duration : duration,
            easingFunction : Tween.Easing.Quartic.EaseOut,
            startValue : {
                time : 0.0
            },
            stopValue : {
                time : 1.0
            },
            onUpdate : update
        });
        this._currentAnimations.push(animation);

        addMorphTimeAnimations(this, scene, 0.0, 1.0, duration, onComplete);
    }