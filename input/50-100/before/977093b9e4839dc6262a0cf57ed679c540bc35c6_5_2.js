function () {
            var labels = new Cesium.LabelCollection(undefined);
            var l = labels.add({
                position : ellipsoid.cartographicDegreesToCartesian(new Cesium.Cartographic2(-75.10, 39.57)),
                text     : 'Philadelphia'
            });

            l.setPosition(ellipsoid.cartographicDegreesToCartesian(new Cesium.Cartographic3(-75.10, 39.57, 300000.0)));
            l.setScale(2.0);

            primitives.add(labels);
        }