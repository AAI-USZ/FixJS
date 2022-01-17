function() {
        var dynamicObjectCollection = new DynamicObjectCollection();
        visualizer = new DynamicPolylineVisualizer(scene, dynamicObjectCollection);
        expect(scene.getPrimitives().getLength()).toEqual(1);
        var testObject = dynamicObjectCollection.getOrCreateObject('test');
        var time = new JulianDate();

        testObject.vertexPositions = new MockProperty([new Cartesian3(5678, 1234, 1101112), new Cartesian3(1234, 5678, 9101112)]);
        var polyline = testObject.polyline = new DynamicPolyline();
        polyline.show = new MockProperty(true);
        visualizer.update(time);

        var polylineCollection = scene.getPrimitives().get(0);
        expect(polylineCollection.getLength()).toEqual(1);
        var primitive = polylineCollection.get(0);

        visualizer.update(time);
        //Clearing won't actually remove the primitive because of the
        //internal cache used by the visualizer, instead it just hides it.
        dynamicObjectCollection.clear();
        expect(primitive.getShow()).toEqual(false);
    }