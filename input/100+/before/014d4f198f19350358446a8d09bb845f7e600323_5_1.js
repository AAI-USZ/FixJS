function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group({
            name: 'group'
        });

        group.on('mouseover', function() {
            log('mouseover group');
        });

        group.on('mouseout', function() {
            log('mouseout group');
        });
        var redEllipse = new Kinetic.Ellipse({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 80,
            strokeWidth: 4,
            fill: 'red',
            stroke: 'black',
            name: 'red'
        });

        var greenEllipse = new Kinetic.Ellipse({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 40,
            strokeWidth: 4,
            fill: 'green',
            stroke: 'black',
            name: 'green'
        });

        group.add(redEllipse);
        group.add(greenEllipse);

        layer.add(group);
        stage.add(layer);
    }