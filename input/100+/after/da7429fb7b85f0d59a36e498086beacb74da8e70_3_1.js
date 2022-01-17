function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();

        startTimer();
        for(var n = 0; n < 1000; n++) {
            var star = new Kinetic.Star({
                innerRadius: 20,
                outerRadius: 50,
                fill: 'yellow',
                stroke: 'black',
                strokeWidth: 5,
                numPoints: 5,
                x: Math.random() * stage.getWidth(),
                y: Math.random() * stage.getHeight(),
                shadow: {
                    offset: 5,
                    color: 'black',
                    blur: 5,
                    alpha: 0.5
                }
            });

            layer.add(star);
        }

        stage.add(layer);

        endTimer('draw 1,000 stars');
    }