function() {
        var time = new JulianDate();
        var dynamicObjectCollection = new DynamicObjectCollection();
        visualizer = new DynamicConeVisualizerUsingCustomSensor(scene, dynamicObjectCollection);

        var testObject = dynamicObjectCollection.getOrCreateObject('test');
        testObject.position = new MockProperty(new Cartesian3(1234, 5678, 9101112));
        testObject.orientation = new MockProperty(new Quaternion(0, 0, 0, 1));

        var cone = testObject.cone = new DynamicCone();
        cone.minimumClockAngle = new MockProperty(0.1);
        cone.maximumClockAngle = new MockProperty(0.2);
        cone.innerHalfAngle = new MockProperty(0.3);
        cone.outerHalfAngle = new MockProperty(0.4);
        cone.intersectionColor = new MockProperty(new Color(0.1, 0.2, 0.3, 0.4));
        cone.showIntersection = new MockProperty(true);
        cone.radius = new MockProperty(123.5);
        cone.show = new MockProperty(true);
        cone.capMaterial = new MockProperty(new ColorMaterial(Color.RED));
        cone.innerMaterial = new MockProperty(new ColorMaterial(Color.WHITE));
        cone.outerMaterial = new MockProperty(new ColorMaterial(Color.BLUE));
        cone.silhouetteMaterial = new MockProperty(new ColorMaterial(Color.YELLOW));
        visualizer.update(time);

        expect(scene.getPrimitives().getLength()).toEqual(1);
        var c = scene.getPrimitives().get(0);
        expect(c.minimumClockAngle).toEqual(testObject.cone.minimumClockAngle.getValue(time));
        expect(c.maximumClockAngle).toEqual(testObject.cone.maximumClockAngle.getValue(time));
        expect(c.innerHalfAngle).toEqual(testObject.cone.innerHalfAngle.getValue(time));
        expect(c.outerHalfAngle).toEqual(testObject.cone.outerHalfAngle.getValue(time));
        expect(c.intersectionColor).toEqual(testObject.cone.intersectionColor.getValue(time));
        expect(c.showIntersection).toEqual(testObject.cone.showIntersection.getValue(time));
        expect(c.radius).toEqual(testObject.cone.radius.getValue(time));
        expect(c.show).toEqual(testObject.cone.show.getValue(time));
        expect(c.material).toEqual(testObject.cone.outerMaterial.getValue(time));
        expect(c.modelMatrix).toEqual(new Matrix4(testObject.orientation.getValue(time).conjugate().toRotationMatrix(), testObject.position.getValueCartesian(time)));

        cone.show.value = false;
        visualizer.update(time);
        expect(c.show).toEqual(testObject.cone.show.getValue(time));
    }