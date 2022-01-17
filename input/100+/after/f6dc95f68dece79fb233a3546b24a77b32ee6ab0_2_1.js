function(item) {
                var actions = !internalWMS ? [{
                    action: "opacity",
                    qtip: this.opacityText
                }] : [];
                var nodeConfig = {
                    text: item.displayName,
                    name: item.name,
                    iconCls: 'no-icon',
                    loaded: true,
                    checked: checkedNodes.indexOf(item.name) != -1,
                    uiProvider: 'default',
                    component: !internalWMS ? this.getOpacitySlider(item, '90%') : null,
                    actions: actions,
                    expanded: item.isExpanded,
                    minResolutionHint: item.minResolutionHint,
                    maxResolutionHint: item.maxResolutionHint
                };
                this.addMetadata(item, nodeConfig);
                if (!item.children) {
                    this.addShowIn3DAction(item, nodeConfig);
                    this.addLegend(item, nodeConfig, level);
                    this.addScaleAction(item, nodeConfig);
                    Ext.apply(nodeConfig, {
                        nodeType: 'cgxp_layerparam',
                        leaf: true,
                        layer: item.layer,
                        allItems: group.allLayers,
                        item: item.name,
                        param: 'LAYERS',
                        layer_id: item.id, // layer_id is the id of the layer in database
                        editable: item.editable,
                        uiProvider: 'layer'
                    });
                }
                item.node = parentNode.appendChild(nodeConfig);
                if (item.children) {
                    addNodes.call(this, item.children, item.node, level+1);
                }
            }