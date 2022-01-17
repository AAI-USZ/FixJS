function(group, layers, opacity, visibility, nowarning) {
        var existingGroup = this.root.findChild('groupId', group.name);
        nowarning = nowarning || false;
        if (!existingGroup) {
            var index = this.mapPanel.layers.getCount();
            while (this.mapPanel.map.layers[index-1] instanceof OpenLayers.Layer.Vector && index > 0) { index-- }
            if (group.isInternalWMS !== false) {
                var params = {
                    layers: [],
                    format: 'image/png',
                    transparent: true
                };

                var isExternalgroup = function(name, themes) {
                    for (var i = 0, len = themes.external.length; i < len; i++) {
                        for (var j = 0, len2 = themes.external[i].children.length; j<len2; j++) {
                            if (themes.external[i].children[j].name == name) {
                                return true;
                            }
                        }
                    }
                    return false;
                };
                if (this.themes.external != undefined &&
                    isExternalgroup(group.name, this.themes)) {
                    params.external = true;
                }

                var layer = new OpenLayers.Layer.WMS(
                    group.displayName,
                    this.wmsURL, params, Ext.apply({
                        ref: group.name,
                        visibility: false,
                        singleTile: true,
                        isBaseLayer: false
                    }, this.wmsOptions || {})
                );

                var result = {
                    allLayers: [],
                    checkedLayers: [],
                    disclaimer: {}
                };
                this.parseChildren(group, layer, result);
                group.layer = layer;
                group.allLayers = result.allLayers;
                group.allOlLayers = [layer];
                layer.params.LAYERS = layers || result.checkedLayers;
                this.mapPanel.layers.insert(index,
                    new this.recordType({
                        disclaimer: result.disclaimer,
                        layer: layer
                    }, layer.id));
                Ext.each(this.indexToAdd, function(idx) {
                    if (idx.index >= index) {
                        idx.index++;
                    }
                });
                this.addGroup(group, true);
            }
            else {
                var result = {
                    allLayers: [],
                    checkedLayers: [],
                    disclaimer: {},
                    allOlLayers: []
                };
                this.parseChildren(group, null, result, index);
                group.layers = result.checkedLayers;
                group.allLayers = result.allLayers;
                group.allOlLayers = result.allOlLayers;
                this.addGroup(group, false);
            }
        }
        else {
            layer = existingGroup.attributes.layer;
            if (layers) {
                Ext.each(layers, function(l) {
                    node = existingGroup.findChild('name', l, true);
                    this.fireEvent('checkchange', node, true);
                }, this);
            }
            if(!nowarning) {
                var html = [ 
                    '<div class="layertree-msg">',
                        this.themealreadyloadedText,
                    '</div>'
                ].join('');
                var msg = Ext.DomHelper.insertBefore(
                    this.body,
                    {
                        html: html,
                        xtype: 'container'
                    },
                    true
                ).fadeIn();
                new Ext.util.DelayedTask(function() {
                    var duration = 1;
                    msg.fadeOut({ duration: duration });
                    new Ext.util.DelayedTask(function() {
                        // make sure that the message is actually removed
                        // ("remove" option of fadeOut() doesn't seem to work)
                        msg.remove();
                    }).delay(duration * 1000);
                }).delay(3000);
            }
        }

        if (layer) {
            layer.setOpacity(opacity || 1);
            if (layer.params.LAYERS.length > 0) {
                layer.setVisibility(visibility !== false);
            }
        }
    }