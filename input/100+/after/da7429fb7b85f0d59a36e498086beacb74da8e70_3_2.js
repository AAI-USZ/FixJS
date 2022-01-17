function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var star = new Kinetic.Star({
            innerRadius: 20,
            outerRadius: 50,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 5,
            numPoints: 5,
            x: 70,
            y: 70,
            shadow: {
                offset: 5,
                color: 'black',
                blur: 5,
                alpha: 0.5
            }
        });

        layer.add(star);
        stage.add(layer);

        star.toImage({
            callback: function(img) {
                startTimer();
                for(var n = 0; n < 1000; n++) {
                    var image = new Kinetic.Image({
                        image: img,
                        x: Math.random() * stage.getWidth(),
                        y: Math.random() * stage.getHeight(),
                        offset: 70
                    });

                    layer.add(image);
                }

                layer.draw();

                endTimer('draw 1,000 cached stars');
            }
        });
    }