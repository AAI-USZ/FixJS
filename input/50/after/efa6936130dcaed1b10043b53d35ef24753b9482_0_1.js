function() {
            var spindle = scene.getCamera().getControllers().get(0).spindleController;
            spindle.setReferenceFrame(Cesium.Matrix4.IDENTITY);
        }