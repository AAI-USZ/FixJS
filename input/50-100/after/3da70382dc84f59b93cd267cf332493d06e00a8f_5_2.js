function () {
            var labels = new Cesium.LabelCollection(undefined);
            var l = labels.add({
                position : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-75.10, 39.57)),
                text     : 'Philadelphia'
            });

            l.setPosition(ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-75.10, 39.57, 300000.0)));
            l.setScale(2.0);

            primitives.add(labels);
        }