function () {
            var center = ellipsoid.cartographicDegreesToCartesian(new Cesium.Cartographic3(-75.59777, 40.03883));

            var labels = new Cesium.LabelCollection(undefined);
            labels.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center);
            labels.add({
                position : new Cesium.Cartesian3(0.0, 0.0, 0.0),
                text     : 'Center'
            });
            labels.add({
                position : new Cesium.Cartesian3(1000000.0, 0.0, 0.0),
                text     : 'East'
            });
            labels.add({
                position : new Cesium.Cartesian3(0.0, 1000000.0, 0.0),
                text     : 'North'
            });
            labels.add({
                position : new Cesium.Cartesian3(0.0, 0.0, 1000000.0),
                text     : 'Up'
            });

            primitives.add(labels);
        }