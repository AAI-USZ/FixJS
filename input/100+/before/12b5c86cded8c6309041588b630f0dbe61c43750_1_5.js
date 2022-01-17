function() {
        var dynamicObjectCollection = new DynamicObjectCollection();
        visualizer = new DynamicPolylineVisualizer(scene, dynamicObjectCollection);

        expect(scene.getPrimitives().getLength()).toEqual(0);

        var testObject = dynamicObjectCollection.getOrCreateObject('test');

        var time = new JulianDate();
        var polyline = testObject.polyline = new DynamicPolyline();

        testObject.vertexPositions = new MockProperty([new Cartesian3(5678, 1234, 1101112), new Cartesian3(1234, 5678, 9101112)]);
        polyline.show = new MockProperty(true);

        visualizer.update(time);
        expect(scene.getPrimitives().getLength()).toEqual(1);
        var primitive = scene.getPrimitives().get(0);
        expect(primitive.dynamicObject).toEqual(testObject);
    }