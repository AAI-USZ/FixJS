function() {
            var camera = scene.getCamera();
            var cameraPosition = new Cesium.Cartesian4(camera.position.x, camera.position.y, camera.position.z, 1.0);
            var v = camera.transform.multiplyWithVector(cameraPosition).getXYZ();
            scene.setSunPosition(v);

            //  In case of canvas resize
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            scene.getContext().setViewport({
                x : 0,
                y : 0,
                width : canvas.width,
                height : canvas.height
            });

            scene.getCamera().frustum.aspectRatio = canvas.clientWidth / canvas.clientHeight;

            var s = Cesium.Sandbox.getCurrentCodeSnippet();
            if (s && s.animate) {
                s.animate();
            }
        }