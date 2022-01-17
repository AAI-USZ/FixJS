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

        layer.add(rect);
        stage.add(layer);

        var widthChanged = false;
        var shadowChanged = false;

        rect.on('widthChange', function() {
            widthChanged = true;
        });
        
        rect.on('shadowChange', function() {
            shadowChanged = true;
        });

        rect.setSize(210);
        rect.setShadow({
        	offset: {
        		x: 20
        	}
        });

        test(widthChanged, 'width change event was not fired');
        test(shadowChanged, 'shadow change event not fired');
    }