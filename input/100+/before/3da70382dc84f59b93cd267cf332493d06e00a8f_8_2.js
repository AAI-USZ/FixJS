function () {
            var polyline = new Cesium.Polyline(undefined);
            polyline.setPositions(ellipsoid.cartographicDegreesToCartesians([
                new Cesium.Cartographic2(-75.10, 39.57),  // Philadelphia
                new Cesium.Cartographic2(-80.12, 25.46)   // Miami
            ]));

            // The color's alpha component defines the polyline's opacity.
            // 0 - completely transparent.  255 - completely opaque.
            polyline.color = { red : polyline.color.red, green : polyline.color.green, blue : polyline.color.blue, alpha : 0.5 };
            polyline.outlineColor = { red : polyline.outlineColor.red, green : polyline.outlineColor.green, blue : polyline.outlineColor.blue, alpha : 0.5 };

            primitives.add(polyline);
        }