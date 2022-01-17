function(duration, onComplete) {
        var that = this;

        var scene = this._scene;
        var camera = scene.getCamera();
        var maxRadii = this._ellipsoid.getMaximumRadius();

        var tanPhi = Math.tan(this._cameraCV.frustum.fovy * 0.5);
        var tanTheta = this._cameraCV.frustum.aspectRatio * tanPhi;
        var d = (maxRadii * Math.PI) / tanTheta;
        var endPos2D = this._camera2D.position.normalize().multiplyWithScalar(d);

        var top = camera.frustum.top;
        var bottom = camera.frustum.bottom;
        var right = camera.frustum.right;
        var left = camera.frustum.left;

        var frustum2D = this._camera2D.frustum;
        var frustumCV = this._cameraCV.frustum;

        var startPos = camera.position.clone();

        var update2D = function(value) {
            camera.position = that._columbusViewMorph(startPos, endPos2D, value.time);
            camera.frustum.top = CesiumMath.lerp(top, frustum2D.top, value.time);
            camera.frustum.bottom = CesiumMath.lerp(bottom, frustum2D.bottom, value.time);
            camera.frustum.right = CesiumMath.lerp(right, frustum2D.right, value.time);
            camera.frustum.left = CesiumMath.lerp(left, frustum2D.left, value.time);
        };

        var startTime = (right - left) / (2.0 * maxRadii * Math.PI);
        var endTime = 1.0;
        if (startTime > endTime) {
            startTime = 0.0;
        }

        var partialDuration = (endTime - startTime) * duration;
        if (partialDuration === 0 && Cartesian2.magnitude(Cartesian2.subtract(startPos, endPos2D, startPos)) !== 0) {
            partialDuration = duration;
            startTime = 0.0;
            endTime = 1.0;
        }

        var animation = scene.getAnimations().add({
            easingFunction : Tween.Easing.Quartic.EaseOut,
            duration : partialDuration,
            startValue : {
                time : startTime
            },
            stopValue : {
                time : endTime
            },
            onUpdate : update2D,
            onComplete : function() {
                camera.frustum = frustumCV.clone();
                onComplete.call(that);
            }
        });
        this._currentAnimations.push(animation);
    }