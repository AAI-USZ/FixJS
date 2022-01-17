function() {
            flight = scene.getCamera().getControllers().addFlight({
                destination : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-118.26, 34.19, 100000.0)),
                duration : 4.0
            });
        }