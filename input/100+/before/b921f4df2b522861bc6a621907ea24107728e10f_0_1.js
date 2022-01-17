function(group, internalWMS) {
        function addNodes(children, parentNode, level) {
            if (!level) {
                level = 1;
            }
            var checkedNodes = internalWMS ? group.layer.params.LAYERS : group.layers;
            Ext.each(children, function(item) {
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
            }, this);
        }

        function updateMoveUp(el) {
            var isFirst = this.isFirst();
            if (isFirst && !this._updating &&
            this.nextSibling &&
            this.nextSibling.hidden === false) {
                this._updating = true; // avoid recursion
                var next = this.nextSibling;
                if (next) {
                    this.ownerTree.actionsPlugin.updateActions(next);
                }
                delete this._updating;
            }
            if (isFirst) {
                el.addClass('disabled');
            } else {
                el.removeClass('disabled');
            }
        }

        function updateMoveDown(el) {
            var isLast = this.isLast();
            if (isLast && !this._updating &&
            this.previousSibling &&
            this.previousSibling.hidden === false) {
                this._updating = true; // avoid recursion
                var previous = this.previousSibling;
                if (previous) {
                    this.ownerTree.actionsPlugin.updateActions(previous);
                }
                delete this._updating;
            }
            if (isLast) {
                el.addClass('disabled');
            } else {
                el.removeClass('disabled');
            }
        }

        var actions = internalWMS ? [{
            action: "opacity",
            qtip: this.opacityText
        }] : [];
        actions.push({
            action: "up",
            qtip: this.moveupText,
            update: updateMoveUp
        });
        actions.push({
            action: "down",
            qtip: this.movedownText,
            update: updateMoveDown
        });
        actions.push({
            action: "delete",
            qtip: this.deleteText
        });
        var groupNodeConfig = {
            text: group.displayName,
            groupId: group.name,
            internalWMS: internalWMS,
            iconCls: 'no-icon',
            cls: 'x-tree-node-theme',
            loaded: true,
            uiProvider: 'layer',
            checked: false,
            layer: group.layer,
            allOlLayers: group.allOlLayers,
            component: internalWMS ? this.getOpacitySlider(group) : null,
            actions: actions
        };
        if (internalWMS) {
            groupNodeConfig.nodeType = 'cgxp_layer';
        }
        this.addMetadata(group, groupNodeConfig, true);
        var groupNode = this.root.insertBefore(groupNodeConfig,
                                               this.root.firstChild);
        addNodes.call(this, group.children, groupNode, 1);
        this.fireEvent('addgroup');
        groupNode.expand(true, false);
        groupNode.collapse(true, false);
        if (group.isExpanded) {
            groupNode.expand(false, false);
        }
        groupNode.ui.show();
        groupNode.cascade(this.checkInRange);
        return groupNode;
    }