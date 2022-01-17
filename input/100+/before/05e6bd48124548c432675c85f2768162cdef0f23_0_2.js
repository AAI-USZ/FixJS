function(o) {
        // instruct the layertree to add new layers in a single group
        // with a single OpenLayers layer
        var layer = o.layer,
            layerNames = layer.params.LAYERS,
            layerTitles = layer.name.split(','),
            children = [], urlObj, groupName;
        Ext.each(layerNames, function(layerName, idx) {
            children.push({
                displayName: layerTitles[idx],
                name: layerName,
                layer: layer,
                editable: false
            });
        });

        // create a human readable group name
        urlObj = OpenLayers.Util.createUrlObject(layer.url, {
            ignorePort80: true
        });
        groupName = urlObj.host + (urlObj.port ? ':'+urlObj.port : '') + urlObj.pathname;
        
        this.addGroup({
            displayName: groupName,
            isExpanded: true,
            name: groupName,
            allOlLayers: [layer],
            layer: layer,
            children: children
        }, true);
    }