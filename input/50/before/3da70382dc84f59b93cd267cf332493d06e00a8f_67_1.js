function() {
            collection.addFlight({
                destination : Ellipsoid.WGS84.cartographicDegreesToCartesian(new Cartographic3(-118.26, 34.19, 100000.0)), // Los Angeles
                duration : 4.0
            });
        }