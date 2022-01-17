function() {
        canvas = new FakeCanvas();
        ellipsoid = Ellipsoid.WGS84;

        moverate = 3.0;
        zoomrate = 1.0;
        position = new Cartesian3();
        up = Cartesian3.UNIT_Y;
        dir = Cartesian3.UNIT_Z.negate();
        right = dir.cross(up);

        frustum = new OrthographicFrustum();
        frustum.near = 1.0;
        frustum.far = 2.0;
        frustum.left = -2.0;
        frustum.right = 2.0;
        frustum.top = 1.0;
        frustum.bottom = -1.0;

        camera = new Camera(canvas);
        camera.position = position;
        camera.up = up;
        camera.direction = dir;
        camera.right = right;
        camera.frustum = frustum;

        controller = new Camera2DController(canvas, camera, ellipsoid);
    }