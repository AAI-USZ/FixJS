function(containerId) {
        var side = 100;
        var diagonal = Math.sqrt(side*side*2);

        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200,
            name: 'stageName',
            id: 'stageId'
        });
        var layer = new Kinetic.Layer({
            name: 'layerName',
            id: 'layerId'
        });
        var group = new Kinetic.Group({
            name: 'groupName',
            id: 'groupId',
            rotationDeg: 45,
            offset: [side/2, side/2],
            x: diagonal/2,
            y: diagonal/2
        });
        var rect = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: side,
            height: side,
            fill: 'red',
            name: 'rectName',
            id: 'rectId'
        });
        var marker = new Kinetic.Rect({
            x: side,
            y: 0,
            width: 1,
            height: 1,
            fill: 'blue',
            stroke: 'blue',
            strokeWidth: 4,
            name: 'markerName',
            id: 'markerId'
        });

        group.add(rect);
        group.add(marker);
        layer.add(group);
        stage.add(layer);

        test(Math.round(marker.getAbsolutePosition().x) === Math.round(diagonal), 'marker absolute position x should be about ' + Math.round(diagonal) + ' but is about ' + Math.round(marker.getAbsolutePosition().x));
        test(Math.round(marker.getAbsolutePosition().y) === Math.round(diagonal/2), 'marker absolute position y should be about ' + Math.round(diagonal/2) + ' but is about ' + Math.round(marker.getAbsolutePosition().y));
    }