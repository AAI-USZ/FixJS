function(node, action, evt) {
        var key;
        if (action.indexOf('legend') != -1) {
            action = 'legend';
        }
        switch (action) {
            case 'metadata':
                this.onMetadataAction(node);
                break;
            case 'delete':
                var tree = node.getOwnerTree();
                node.remove();
                if (node.attributes.layer) {
                    node.layer.destroy();
                }
                else {
                    Ext.each(node.attributes.allOlLayers, function(layer) {
                        layer.destroy();
                    });
                }
                tree.fireEvent('removegroup');
                break;
            case 'opacity':
                var slider = node.component;
                if (!slider.getEl().isVisible()) {
                    slider.el.setVisibilityMode(Ext.Element.DISPLAY);
                    // calculate the size
                    slider.el.show();
                    slider.doLayout();
                    slider.el.hide();
                    slider.el.slideIn('t', {
                        useDisplay: true,
                        duration: 0.2,
                        callback: function(el) {
                            if (Ext.isIE) {
                                el.show({
                                    duration: 0.01
                                });
                            }
                        }
                    });
                } else {
                    slider.el.setVisibilityMode(Ext.Element.DISPLAY);
                    slider.el.slideOut('t', {
                        useDisplay: true,
                        duration: 0.2
                    });
                }
                break;
            case 'down':
                var next;
                var current = false;
                this.getRootNode().eachChild(function(n) {
                    if (n == node) {
                        current = true;
                    }
                    else if (current) {
                        next = n;
                        current = false;
                    }
                });
                var index = -next.attributes.allOlLayers.length;
                Ext.each(node.attributes.allOlLayers, function(layer) {
                    layer.map.raiseLayer(layer, index);
                });
                node.parentNode.insertBefore(node, node.nextSibling.nextSibling);
                node.ownerTree.actionsPlugin.updateActions(node);
                node.ui.removeClass('x-tree-node-over');
                if (Ext.enableFx){
                    node.ui.highlight();
                }
                node.getOwnerTree().fireEvent('ordergroup');
                break;
            case 'up':
                var previous;
                var find = false;
                this.getRootNode().eachChild(function(n) {
                    if (n == node) {
                        find = true;
                    }
                    else if (!find) {
                        previous = n;
                    }
                });
                var index = previous.attributes.allOlLayers.length;
                var layers = [].concat(node.attributes.allOlLayers);
                Ext.each(layers.reverse(), function(layer) {
                    layer.map.raiseLayer(layer, index);
                });
                node.parentNode.insertBefore(node, node.previousSibling);
                node.ownerTree.actionsPlugin.updateActions(node);
                node.ui.removeClass('x-tree-node-over');
                if(Ext.enableFx){
                    node.ui.highlight();
                }
                node.getOwnerTree().fireEvent('ordergroup');
                break;
            case 'legend':
                key = 'legend';
                break;
            case 'zoomtoscale':
                    var n = node,
                    map = n.layer.map,
                    res = map.getResolution(),
                    zoom,
                    center = map.getCenter(),
                    minResolutionHint = n.attributes.minResolutionHint,
                    maxResolutionHint = n.attributes.maxResolutionHint;
                if (maxResolutionHint && maxResolutionHint < res) {
                    zoom = map.getZoomForResolution(maxResolutionHint) + 1;
                } else if (minResolutionHint && minResolutionHint > res) {
                    zoom = map.getZoomForResolution(minResolutionHint);
                }
                map.setCenter(center, zoom);
                break;
            case 'showin3d':
                var googleEarthPanel = Ext.getCmp("googleearthpanel");
                if (googleEarthPanel) {
                    googleEarthPanel.toggleKmlUrl(node.attributes.kml);
                }
                break;
        }

        if (key) {
            var actionImg = evt.getTarget('.' + action, 10, true);
            var cls = action + "-on";
            if (!node[key].getEl().isVisible()) {
                actionImg.addClass(cls);
                node[key].el.setVisibilityMode(Ext.Element.DISPLAY);
                node[key].el.slideIn('t', {
                    useDisplay: true,
                    duration: 0.2,
                    callback: function(el) {
                        if (Ext.isIE) {
                            el.show({
                                duration: 0.01
                            });
                        }
                    }
                });
            } else {
                actionImg.removeClass(cls);
                node[key].el.setVisibilityMode(Ext.Element.DISPLAY);
                node[key].el.slideOut('t', {
                    useDisplay: true,
                    duration: 0.2
                });
            }
        }
    }