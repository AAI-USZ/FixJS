function () {
            var labels = new Cesium.LabelCollection(undefined);
            labels.add({
                position : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-75.10, 39.57)),
                text     : 'Philadelphia'
            });

            primitives.add(labels);
        }