function () {
            var labels = new Cesium.LabelCollection(undefined);
            labels.add({
                position  : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-75.10, 39.57)),
                text      : 'Philadelphia',
                // CSS font-family
                font      : '36px Helvetica',
                fillColor : { red : 0.0, blue : 1.0, green : 1.0, alpha : 1.0 },
                outlineColor : { red : 0.0, blue : 0.0, green : 0.0, alpha : 1.0 },
                style : Cesium.LabelStyle.FILL_AND_OUTLINE
            });

            primitives.add(labels);
        }