function () {
            var labels = new Cesium.LabelCollection(undefined);
            labels.add({
                position : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-75.10, 39.57)),
                text     : 'Philadelphia'
            });
            labels.add({
                position : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-80.50, 35.14)),
                text     : 'Charlotte'
            });
            labels.add({
                position : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-80.12, 25.46)),
                text     : 'Miami'
            });

            primitives.add(labels);
        }