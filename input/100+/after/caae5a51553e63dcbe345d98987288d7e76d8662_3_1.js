function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 50,
            y: 50,
            width: 200,
            height: 50,
            fill: 'blue',
            shadow: {
                offset: [10, 10]
            }
        });

        var circle = new Kinetic.Ellipse({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: [70, 35],
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        layer.add(circle);
        layer.add(rect);
        stage.add(layer);

        var widthChanged = 0;
        var shadowChanged = 0;
        var radiusChanged = 0;

        rect.on('widthChange', function() {
            widthChanged++;
        });

        rect.on('shadowChange', function() {
            shadowChanged++;
        });

        circle.on('radiusChange', function() {
            radiusChanged++;
        });

        circle.setRadius(70, 20);

        rect.setSize(210);
        rect.setShadow({
            offset: {
                x: 20
            }
        });

        test(widthChanged === 1, 'width change event was not fired correctly');
        test(shadowChanged === 1, 'shadow change event not fired correctly');
        test(radiusChanged === 1, 'radius change event was not fired correctly');

    }