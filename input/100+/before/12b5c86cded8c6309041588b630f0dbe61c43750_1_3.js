function() {
        var time = new JulianDate();

        var dynamicObjectCollection = new DynamicObjectCollection();
        visualizer = new DynamicPolylineVisualizer(scene, dynamicObjectCollection);

        expect(scene.getPrimitives().getLength()).toEqual(0);

        var testObject = dynamicObjectCollection.getOrCreateObject('test');
        testObject.vertexPositions = new MockProperty([new Cartesian3(1234, 5678, 9101112), new Cartesian3(5678, 1234, 1101112)]);

        var polyline = testObject.polyline = new DynamicPolyline();
        polyline.show = new MockProperty(true);
        polyline.color = new MockProperty(new Color(0.8, 0.7, 0.6, 0.5));
        polyline.width = new MockProperty(12.5);
        polyline.outlineColor = new MockProperty(new Color(0.1, 0.2, 0.3, 0.4));
        polyline.outlineWidth = new MockProperty(2.5);

        visualizer.update(time);

        expect(scene.getPrimitives().getLength()).toEqual(1);

        var primitive = scene.getPrimitives().get(0);

        visualizer.update(time);
        expect(primitive.show).toEqual(testObject.polyline.show.getValue(time));
        expect(primitive.getPositions()).toEqual(testObject.vertexPositions.getValueCartesian(time));
        expect(primitive.color).toEqualProperties(testObject.polyline.color.getValue(time));
        expect(primitive.outlineColor).toEqual(testObject.polyline.outlineColor.getValue(time));
        expect(primitive.outlineWidth).toEqual(testObject.polyline.outlineWidth.getValue(time));
        expect(primitive.width).toEqual(testObject.polyline.width.getValue(time));

        testObject.vertexPositions = new MockProperty([new Cartesian3(5678, 1234, 1101112), new Cartesian3(1234, 5678, 9101112)]);
        polyline.color = new MockProperty(new Color(0.1, 0.2, 0.3, 0.4));
        polyline.width = new MockProperty(2.5);
        polyline.outlineColor = new MockProperty(new Color(0.5, 0.6, 0.7, 0.8));
        polyline.outlineWidth = new MockProperty(12.5);

        visualizer.update(time);
        expect(primitive.show).toEqual(testObject.polyline.show.getValue(time));
        expect(primitive.getPositions()).toEqual(testObject.vertexPositions.getValueCartesian(time));
        expect(primitive.color).toEqualProperties(testObject.polyline.color.getValue(time));
        expect(primitive.outlineColor).toEqual(testObject.polyline.outlineColor.getValue(time));
        expect(primitive.outlineWidth).toEqual(testObject.polyline.outlineWidth.getValue(time));
        expect(primitive.width).toEqual(testObject.polyline.width.getValue(time));

        polyline.show = new MockProperty(false);
        visualizer.update(time);
        expect(primitive.show).toEqual(testObject.polyline.show.getValue(time));
    }