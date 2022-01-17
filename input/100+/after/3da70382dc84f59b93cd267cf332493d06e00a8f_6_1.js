function(movement) {
                var cartesian = scene.pickEllipsoid(movement.endPosition, ellipsoid);
                if (cartesian) {
                    var cartographic = ellipsoid.cartesianToCartographic(cartesian);
                    label.setShow(true);
                    label.setText('(' + Cesium.Math.toDegrees(cartographic.longitude).toFixed(2) + ', ' + Cesium.Math.toDegrees(cartographic.latitude).toFixed(2) + ')');
                    label.setPosition(cartesian);
                } else {
                    label.setText('');
                }
            }