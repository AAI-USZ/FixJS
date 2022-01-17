function() {
        var dynamicObjectCollection = new DynamicObjectCollection();
        visualizer = new DynamicPolylineVisualizer(scene, dynamicObjectCollection);

        var testObject = dynamicObjectCollection.getOrCreateObject('test');
        var polyline = testObject.polyline = new DynamicPolyline();
        polyline.show = new MockProperty(true);

        visualizer.update(new JulianDate());
        expect(scene.getPrimitives().getLength()).toEqual(1);
        var polylineCollection = scene.getPrimitives().get(0);
        expect(polylineCollection.getLength()).toEqual(0);
    }