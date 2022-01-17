function(o) {
        // instruct the layertree to add new layers in a single group
        // with a single OpenLayers layer
        var layer = o.layer;

        var layerTitles = layer.name.split(',');
        var children = [];
        Ext.each(layer.params.LAYERS, function(layerName, idx) {
            children.push({
                displayName: layerTitles[idx],
                name: layerName,
                layer: layer,
                editable: false
            });
        });

        // create a human readable group name
        var urlObj = OpenLayers.Util.createUrlObject(layer.url, {
            ignorePort80: true
        });
        var groupName = urlObj.host + (urlObj.port ? ':'+urlObj.port : '') + urlObj.pathname;
        
        this.target.tools[this.layerTreeId].tree.addGroup({
            displayName: groupName,
            isExpanded: true,
            name: groupName,
            allOlLayers: [layer],
            layer: layer,
            children: children
        }, true);
    }