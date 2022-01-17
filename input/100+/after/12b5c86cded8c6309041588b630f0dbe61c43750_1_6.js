function() {
        var dynamicObjectCollection = new DynamicObjectCollection();
        var testObject = dynamicObjectCollection.getOrCreateObject('test');
        testObject.vertexPositions = new MockProperty([new Cartesian3(5678, 1234, 1101112), new Cartesian3(1234, 5678, 9101112)]);
        testObject.polyline = new DynamicPolyline();
        testObject.polyline.show = new MockProperty(true);

        var dynamicObjectCollection2 = new DynamicObjectCollection();
        var testObject2 = dynamicObjectCollection2.getOrCreateObject('test2');
        testObject2.vertexPositions = new MockProperty([new Cartesian3(1234, 5678, 9101112), new Cartesian3(5678, 1234, 1101112)]);
        testObject2.polyline = new DynamicPolyline();
        testObject2.polyline.show = new MockProperty(true);

        visualizer = new DynamicPolylineVisualizer(scene, dynamicObjectCollection);

        var time = new JulianDate();

        visualizer.update(time);
        expect(scene.getPrimitives().getLength()).toEqual(1);
        var polylineCollection = scene.getPrimitives().get(0);
        expect(polylineCollection.getLength()).toEqual(1);
        var primitive = polylineCollection.get(0);
        expect(primitive.dynamicObject).toEqual(testObject);

        visualizer.setDynamicObjectCollection(dynamicObjectCollection2);
        visualizer.update(time);
        expect(scene.getPrimitives().getLength()).toEqual(1);
        primitive = polylineCollection.get(0);
        expect(primitive.dynamicObject).toEqual(testObject2);
    }