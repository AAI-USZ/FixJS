function () {
            var polyline = new Cesium.Polyline(undefined);
            polyline.setPositions(ellipsoid.cartographicArrayToCartesianArray([
                Cesium.Cartographic.fromDegrees(-75.10, 39.57),  // Philadelphia
                Cesium.Cartographic.fromDegrees(-80.12, 25.46)   // Miami
            ]));

            // The color's alpha component defines the polyline's opacity.
            // 0 - completely transparent.  255 - completely opaque.
            polyline.color = { red : polyline.color.red, green : polyline.color.green, blue : polyline.color.blue, alpha : 0.5 };
            polyline.outlineColor = { red : polyline.outlineColor.red, green : polyline.outlineColor.green, blue : polyline.outlineColor.blue, alpha : 0.5 };

            primitives.add(polyline);
        }