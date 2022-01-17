function () {
            // A white circle is drawn into a 2D canvas.  The canvas is used as
            // a texture for billboards, each of which applies a different color
            // and scale to change the point's appearance.
            //
            // The 2D canvas can draw much more than circles.  See:
            // https://developer.mozilla.org/en/Canvas_tutorial
            var canvas = document.createElement('canvas');
            canvas.width = 16;
            canvas.height = 16;
            var context2D = canvas.getContext('2d');
            context2D.beginPath();
            context2D.arc(8, 8, 8, 0, Cesium.Math.TWO_PI, true);
            context2D.closePath();
            context2D.fillStyle='rgb(255, 255, 255)';
            context2D.fill();

            var billboards = new Cesium.BillboardCollection(undefined);
            var textureAtlas = scene.getContext().createTextureAtlas({image : canvas});
            billboards.setTextureAtlas(textureAtlas);
            billboards.add({
                position : ellipsoid.cartographicDegreesToCartesian(new Cesium.Cartographic3(-75.59777, 40.03883)),
                color : { red : 1.0, blue : 0.0, green : 0.0, alpha : 1.0 },
                scale : 0.5
            });

            billboards.add({
                position : ellipsoid.cartographicDegreesToCartesian(new Cesium.Cartographic3(-80.50, 35.14)),
                color : { red : 0.0, blue : 1.0, green : 0.0, alpha : 1.0 }
            });

            billboards.add({
                position : ellipsoid.cartographicDegreesToCartesian(new Cesium.Cartographic3(-80.12, 25.46)),
                color : { red : 0.0, blue : 0.0, green : 1.0, alpha : 1.0 },
                scale : 2
            });

            primitives.add(billboards);
        }