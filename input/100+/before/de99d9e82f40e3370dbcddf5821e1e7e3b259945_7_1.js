function() {
        var time = new JulianDate();
        var dynamicObjectCollection = new DynamicObjectCollection();
        visualizer = new DynamicPyramidVisualizer(scene, dynamicObjectCollection);

        var testObject = dynamicObjectCollection.getOrCreateObject('test');
        testObject.position = new MockProperty(new Cartesian3(1234, 5678, 9101112));
        testObject.orientation = new MockProperty(new Quaternion(0, 0, 0, 1));

        var pyramid = testObject.pyramid = new DynamicPyramid();
        pyramid.directions = new MockProperty([new Spherical(0, 0, 0), new Spherical(1, 0, 0), new Spherical(2, 0, 0), new Spherical(3, 0, 0)]);
        pyramid.intersectionColor = new MockProperty(new Color(0.1, 0.2, 0.3, 0.4));
        pyramid.showIntersection = new MockProperty(true);
        pyramid.radius = new MockProperty(123.5);
        pyramid.show = new MockProperty(true);
        pyramid.material = new MockProperty(new ColorMaterial(Color.RED));
        visualizer.update(time);

        expect(scene.getPrimitives().getLength()).toEqual(1);
        var p = scene.getPrimitives().get(0);
        expect(p.intersectionColor).toEqual(testObject.pyramid.intersectionColor.getValue(time));
        expect(p.showIntersection).toEqual(testObject.pyramid.showIntersection.getValue(time));
        expect(p.radius).toEqual(testObject.pyramid.radius.getValue(time));
        expect(p.show).toEqual(testObject.pyramid.show.getValue(time));
        expect(p.material).toEqual(testObject.pyramid.material.getValue(time));
        expect(p.modelMatrix).toEqual(new Matrix4(Matrix3.fromQuaternion(testObject.orientation.getValue(time).conjugate()), testObject.position.getValueCartesian(time)));

        pyramid.show.value = false;
        visualizer.update(time);
        expect(p.show).toEqual(testObject.pyramid.show.getValue(time));
    }