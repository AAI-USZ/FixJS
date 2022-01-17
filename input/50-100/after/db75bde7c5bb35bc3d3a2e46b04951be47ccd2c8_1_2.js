function() {
        var camera = new Camera(document);
        camera.frustum = new OrthographicFrustum();
        controller2 = new Camera2DController(document, camera, projection);
        expect(function () {
            controller2.zoomIn(moverate);
        }).toThrow();
    }