function() {
            var spindle = scene.getCamera().getControllers().get(0);
            spindle.setReferenceFrame(Cesium.Matrix4.IDENTITY);
        }