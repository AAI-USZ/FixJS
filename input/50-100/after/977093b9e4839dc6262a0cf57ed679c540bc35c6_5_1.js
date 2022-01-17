function () {
            var labels = new Cesium.LabelCollection(undefined);
            labels.add({
                position : ellipsoid.cartographicDegreesToCartesian(new Cesium.Cartographic3(-75.10, 39.57)),
                text     : 'Philadelphia'
            });

            primitives.add(labels);
        }