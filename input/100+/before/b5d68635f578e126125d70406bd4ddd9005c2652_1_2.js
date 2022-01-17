function() {
        this.on("beforeunload", function() {
            if (this.modified && this.config["edit_map"]) {
                this.showMetadataForm();
                return false;
            }
        }, this);

        var geoEx = this;
        // TODO: make a proper component out of this
        var mapOverlay = this.createMapOverlay();
        this.mapPanel.add(mapOverlay);

        if (!this.busyMask) {
            this.busyMask = new Ext.LoadMask(
                Ext.getBody(), {
                    msg: this.loadingMapMessage
                }
            );
        }
        this.busyMask.show();

        var addLayerButton = new Ext.Button({
            tooltip : this.addLayersButtonText,
            disabled: false,
            text: '<span class="x-btn-text">' + this.addLayersButtonText + '</span>',
            handler : this.showSearchWindow,
            scope: this
        });

        this.on("ready", function() {
            this.addInfo();

            //var queryTool = new GeoExplorer.FeatureQueryTool(this, 'queryPanel', 'gridWinPanel');

            this.mapPanel.layers.on({
                "update": function() {
                    this.modified |= 1;
                },
                "add": function() {
                    this.modified |= 1;
                },
                "remove": function(store, rec) {
                    this.modified |= 1;
                    delete this.stylesDlgCache[rec.getLayer().id];
                },
                scope: this
            });

            if (this.busyMask) {
                this.busyMask.hide();
            }

            //Show the info window if it's the first time here
            if (this.config.first_visit)
                this.showInfoWindow();
        });

        var getRecordFromNode = function(node) {
            if (node && node.layer) {
                var layer = node.layer;
                var store = node.layerStore;
                record = store.getAt(store.findBy(function(r) {
                    return r.getLayer() === layer;
                }));
            }
            return record;
        };

        var getSelectedLayerRecord = function() {
            var node = layerTree.getSelectionModel().getSelectedNode();
            return getRecordFromNode(node);
        };

        var removeLayerAction = new Ext.Action({
            text: this.removeLayerActionText,
            iconCls: "icon-removelayers",
            disabled: true,
            tooltip: this.removeLayerActionTipText,
            handler: function() {
                var record = getSelectedLayerRecord();
                if (record) {
                    this.mapPanel.layers.remove(record, true);
                    removeLayerAction.disable();
                }
            },
            scope: this
        });

        this.treeRoot = new Ext.tree.TreeNode({
            text: "Layers",
            expanded: true,
            isTarget: false,
            allowDrop: false
        });

        this.treeRoot.appendChild(new GeoExt.tree.LayerContainer({
            text: this.layerContainerText,
            id: "maplayerroot",
            iconCls: "gx-folder",
            expanded: true,
            loader: new GeoExt.tree.LayerLoader({
                store: this.mapPanel.layers,
                filter: function(record) {
                    return record.get("group") == "none" &&
                        record.getLayer().displayInLayerSwitcher == true;
                },
                createNode: function(attr) {
                    var layer = attr.layer;
                    var store = attr.layerStore;
                    if (layer && store) {
                        var record = store.getAt(store.findBy(function(r) {
                            return r.getLayer() === layer;
                        }));
                        if (record && !record.get("queryable")) {
                            attr.iconCls = "gx-tree-rasterlayer-icon";
                        }
                    }
                    return GeoExt.tree.LayerLoader.prototype.createNode.apply(this, [attr]);
                }
            }),
            singleClickExpand: true,
            allowDrop: true,
            allowDrag: true,
            listeners: {
                append: function(tree, node) {
                    node.expand();
                }
            }
        }));

        this.treeRoot.appendChild(new GeoExt.tree.LayerContainer({
            text: this.backgroundContainerText,
            iconCls: "gx-folder",
            expanded: true,
            group: "background",
            loader: new GeoExt.tree.LayerLoader({
                baseAttrs: {checkedGroup: "background"},
                store: this.mapPanel.layers,
                filter: function(record) {
                    return record.get("group") === "background" &&
                        record.getLayer().displayInLayerSwitcher == true;
                },
                createNode: function(attr) {
                    var layer = attr.layer;
                    var store = attr.layerStore;
                    if (layer && store) {
                        var record = store.getAt(store.findBy(function(r) {
                            return r.getLayer() === layer;
                        }));
                        if (record) {
                            if (!record.get("queryable")) {
                                attr.iconCls = "gx-tree-rasterlayer-icon";
                            }
                            if (record.get("fixed")) {
                                attr.allowDrag = false;
                            }
                        }
                    }
                    return GeoExt.tree.LayerLoader.prototype.createNode.apply(this, arguments);
                }
            }),
            singleClickExpand: true,
            allowDrag: false,
            listeners: {
                append: function(tree, node) {
                    node.expand();
                }
            }
        }));

        createPropertiesDialog = function() {
            var node = layerTree.getSelectionModel().getSelectedNode();
            if (node && node.layer) {
                var layer = node.layer;
                var store = node.layerStore;
                var record = store.getAt(store.findBy(function(record) {
                    return record.getLayer() === layer;
                }));
                var backupParams = Ext.apply({}, record.getLayer().params);
                var prop = this.propDlgCache[layer.id];
                if (!prop) {
                    prop = this.propDlgCache[layer.id] = new Ext.Window({
                        title: "Properties: " + record.getLayer().name,
                        width: 280,
                        autoHeight: true,
                        closeAction: "hide",
                        items: [
                            {
                                xtype: "gxp_wmslayerpanel",
                                autoHeight: true,
                                layerRecord: record,
                                defaults: {
                                    autoHeight: true,
                                    hideMode: "offsets"
                                },
                                listeners: {
                                    "change": function() {
                                        this.modified |= 1;
                                    },
                                    "beforerender": {
                                        fn: function(cmp) {
                                            Ext.Ajax.request({
                                                url: "/data/" + layer.params.LAYERS + "/ajax_layer_edit_check/",
                                                method: "POST",
                                                params: {layername:record.getLayer().params.LAYERS},
                                                callback: function(options, success, response) {
                                                    cmp.authorized = cmp.editableStyles = (response.responseText == "True");
                                                    cmp.ownerCt.doLayout();
                                                }
                                            });
                                        },
                                    scope: this
                                    },
                                    scope: this
                                }
                            }
                        ]
                    });
                    // disable the "About" tab's fields to indicate that they
                    // are read-only
                    //TODO WMSLayerPanel should be easier to configure for this
                    prop.items.get(0).items.get(1).cascade(function(i) {
                        i instanceof Ext.form.Field && i.setDisabled(true);
                    });

                    isLocal = layer.url.replace(
                        this.urlPortRegEx, "$1/").indexOf(
                        this.localGeoServerBaseUrl.replace(
                            this.urlPortRegEx, "$1/")) === 0;

                    if (isLocal) {
                        prop.items.get(0).items.get(0).add({html: "<a target='_blank' href='/data/" + layer.params.LAYERS + "'>" + this.shareLayerText + "</a>", xtype: "panel"});
                    }
                            }
                prop.show();
            }
        };

        var showPropertiesAction = new Ext.Action({
            text: this.layerPropertiesText,
            iconCls: "icon-layerproperties",
            disabled: true,
            tooltip: this.layerPropertiesTipText,
            handler: createPropertiesDialog.createSequence(function() {
                var node = layerTree.getSelectionModel().getSelectedNode();
                this.propDlgCache[node.layer.id].items.get(0).setActiveTab(1);
            }, this),
            scope: this
        });

        var updateLayerActions = function(sel, node) {
            if (node && node.layer) {
                removeLayerAction.show();
                zoomLayerAction.show();
                showPropertiesAction.show();
//            	showStylesAction.show();
                // allow removal if more than one non-vector layer
                var count = this.mapPanel.layers.queryBy(
                    function(r) {
                        return !(r.getLayer() instanceof OpenLayers.Layer.Vector);
                    }).getCount();
                if (count > 1) {
                    removeLayerAction.enable();
                    zoomLayerAction.enable();
                } else {
                    zoomLayerAction.disable();
                    removeLayerAction.disable();
                }
                var record = getRecordFromNode(node);
                if (record.get("properties")) {
                    showPropertiesAction.enable();
                } else {
                    showPropertiesAction.disable();
                }
                removeCategoryAction.hide();
                addCategoryAction.hide();
                renameAction.hide();

                var changed = true;
                var layer = node.layer;
                var store = node.layerStore;
                var record = store.getAt(store.findBy(function(r) {
                    return r.getLayer() === layer;
                }));
                this.selectionChanging = true;
                changed = geoEx.selectLayer(record);
                this.selectionChanging = false;
                return changed;

            } else {
                addCategoryAction.hide();
                removeLayerAction.hide();
                showPropertiesAction.hide();
//                showStylesAction.hide();
                zoomLayerAction.hide();
                if (node && !node.parentNode.isRoot) {
                    removeCategoryAction.show();
                    renameAction.show();
                    addCategoryAction.hide();
                } else if (node && node.parentNode.isRoot) {
                    addCategoryAction.show();
                    removeCategoryAction.hide();
                    renameAction.hide();
                } else {
                    addCategoryAction.hide();
                    removeCategoryAction.hide();
                    renameAction.hide();
                }

            }
        };

        var zoomLayerAction = new Ext.Action({
            text: this.zoomToLayerExtentText,
            disabled: true,
            iconCls: "icon-zoom-to",
            handler: function() {
                var node = layerTree.getSelectionModel().getSelectedNode();
                if (node && node.layer) {
                    var map = this.mapPanel.map;
                    var extent = node.layer.restrictedExtent || map.maxExtent;
                    map.zoomToExtent(extent, true);
                }
            },
            scope: this
        })

        var renameNode = function(node) {
            Ext.MessageBox.prompt('Rename Category', 'New name for \"' + node.text + '\"', function(btn, text) {
                if (btn == 'ok') {
                    this.modified |= 1;
                    var a = node;
                    node.setText(text);
                    node.attributes.group = text;
                    node.group = text;
                    node.loader.filter = function(record) {

                        return record.get("group") == text &&
                            record.getLayer().displayInLayerSwitcher == true;
                    }

                    node.eachChild(function(n) {

                        record = getRecordFromNode(n);
                        if (record) {
                            record.set("group", text);
                        }
                    });


                    node.ownerTree.fireEvent('beforechildrenrendered', node.parentNode);
                }
            });
        };

        var renameAction = new Ext.Action({
            text: this.renameCategoryActionText,
            iconCls: "icon-layerproperties",
            disabled: false,
            tooltip: this.renameCategoryActionTipText,
            handler: function() {
                var node = layerTree.getSelectionModel().getSelectedNode();
                renameNode(node);
            },
            scope: this
        });


        var addCategoryAction = new Ext.Action({
            text: this.addCategoryActionText,
            iconCls: "icon-add",
            disabled: false,
            tooltip: this.addCategoryActionTipText,
            handler: function() {
                var geoEx = this;
                var node = layerTree.getSelectionModel().getSelectedNode();
                Ext.MessageBox.prompt('Add Category', 'Category name:', function(btn, text) {
                    if (btn == 'ok') {
                        geoEx.addCategoryFolder(text, true);
                    }
                });
            },
            scope: this
        });

        var removeCategoryAction = new Ext.Action({
            text: this.removeCategoryActionText,
            iconCls: "icon-removelayers",
            disabled: false,
            tooltip: this.removeCategoryActionTipText,
            handler: function() {
                var node = layerTree.getSelectionModel().getSelectedNode();
                if (node.parentNode.isRoot) {
                    Ext.Msg.alert(this.layerContainerText, "This category cannot be removed");
                    return false;
                }
                if (node) {

                    while (node.childNodes.length > 0) {
                        cnode = node.childNodes[0];
                        record = getRecordFromNode(cnode);
                        if (record) {
                            this.mapPanel.layers.remove(record, true);
                        }
                    }
                    ;
                    parentNode = node.parentNode;
                    parentNode.removeChild(node, true);
                }
            },
            scope: this
        });

        var mapLayersText = this.layerContainerText;
        var backgroundText = this.backgroundContainerText;

        //var geoEx = this;
        var layerTree = new Ext.tree.TreePanel({
            root: this.treeRoot,
            rootVisible: false,
            border: false,
            enableDD: true,
            selModel: new Ext.tree.DefaultSelectionModel({
                listeners: {
                    beforeselect: updateLayerActions,
                    scope: this
                }
            }),
            listeners: {
                contextmenu: function(node, e) {
                    if (node) {
                        node.select();
                        var c = node.getOwnerTree().contextMenu;
                        c.contextNode = node;
                        c.showAt(e.getXY());
                    }
                },
                beforemovenode: function(tree, node, oldParent, newParent, index) {
                    // change the group when moving to a new container
                    if (node.layer && oldParent !== newParent) {
                        var store = newParent.loader.store;
                        var index = store.findBy(function(r) {
                            return r.getLayer() === node.layer;
                        });
                        var record = store.getAt(index);
                        record.set("group", newParent.attributes.group);
                    }
                },
                beforenodedrop: function(dropEvent) {
                    var source_folder_id = undefined;
                    var dest_folder = undefined;

                    // Folders can be dragged, but not into another folder
                    if (dropEvent.data.node.attributes.iconCls == 'gx-folder') {
                        //alert('gx-folder::' + dropEvent.target.attributes.iconCls + ":" + dropEvent.point + ":" + dropEvent.target.parentNode.text + ":" + dropEvent.target.text);
                        if (dropEvent.target.attributes.iconCls != "gx-folder")
                            dropEvent.target = dropEvent.target.parentNode;
                        if ((dropEvent.target.attributes.iconCls == 'gx-folder' && dropEvent.point == "above") || (dropEvent.target.text != backgroundText && dropEvent.target.attributes.iconCls == 'gx-folder' && dropEvent.point == "below")) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        if (dropEvent.target.parentNode.text == backgroundText || (dropEvent.target.parentNode.text == mapLayersText && dropEvent.point != "append") || dropEvent.target.parentNode.text == "Layers")
                            return false;
                        else
                            return true;
                    }

                },
                movenode: function(tree, node, oldParent, newParent, index) {
                    if (!node.layer)
                        this.reorderNodes();
                },
                scope: this
            },
            contextMenu: new Ext.menu.Menu({
                items: [ zoomLayerAction,
                    removeLayerAction,
                    showPropertiesAction,
                    //showStylesAction,
                    addCategoryAction,
                    renameAction,
                    removeCategoryAction
                ]
            })
        });

        this.gxSearchBar = new GeoExplorer.SearchBar(this);
        var searchPanel = new Ext.Panel({
            anchor: "100% 5%",
            items: [this.gxSearchBar]
        });

        var layersContainer = new Ext.Panel({
            autoScroll: true,
            border: false,
            title: this.layersContainerText,
            items: [layerTree]
        });


        this.legendPanel = new GeoExt.LegendPanel({
            title: this.legendPanelText,
            border: false,
            hideMode: "offsets",
            split: true,
            autoScroll: true,
            ascending: false,
            map: this.mapPanel.map,
            filter: function(record) {
                return record.data.group == undefined || (record.data.group != "Overlays" && !(record.data.layer instanceof OpenLayers.Layer.Vector));
            },
            defaults: {cls: 'legend-item'}
        });

        var layersTabPanel = new Ext.TabPanel({
            anchor: "100% 95%",
            border: false,
            deferredRender: false,
            items: [layersContainer, this.legendPanel],
            activeTab: 0
        });

        //needed for Safari
        var westPanel = new Ext.Panel({
            id: 'gx_westPanel',
            layout: "anchor",
            collapseMode: "mini",
            header: false,
            split: true,
            items: [layersTabPanel,searchPanel],
            region: "west",
            width: 250
        });


        var gridWinPanel = new Ext.Panel({
            id: 'gridWinPanel',
            collapseMode: "mini",
            title: 'Identify Results',
            region: "west",
            autoScroll: true,
            split: true,
            items: [],
            width:200
        });

        var gridResultsPanel = new Ext.Panel({
            id: 'gridResultsPanel',
            title: 'Feature Details',
            region: "center",
            collapseMode: "mini",
            autoScroll: true,
            split: true,
            items: [],
            width: 400
        });


        var identifyWindow = new Ext.Window({
            id: 'queryPanel',
            layout: "border",
            closeAction: "hide",
            items: [gridWinPanel, gridResultsPanel],
            width: 600,
            height: 400
        });




        this.toolbar = new Ext.Toolbar({
            disabled: true,
            id: 'paneltbar',
            items: [
                addLayerButton,
                "-",
                this.createTools()
            ]
        });

        this.on("ready", function() {
            // enable only those items that were not specifically disabled
            var disabled = this.toolbar.items.filterBy(function(item) {
                return item.initialConfig && item.initialConfig.disabled;
            });
            this.toolbar.enable();
            disabled.each(function(item) {
                item.disable();
            });


            if (this.busyMask) {
                this.busyMask.hide();
            }

        }, this);

        this.googleEarthPanel = new gxp.GoogleEarthPanel({
            mapPanel: this.mapPanel,
            listeners: {
                "beforeadd": function(record) {
                    return record.get("group") !== "background";
                },
                "show": function() {
                    addLayerButton.disable();
                    removeLayerAction.disable();
                    layerTree.getSelectionModel().un(
                        "beforeselect", updateLayerActions, this);
                },
                "hide": function() {
                    addLayerButton.enable();
                    updateLayerActions();
                    layerTree.getSelectionModel().on(
                        "beforeselect", updateLayerActions, this);
                }
            }
        });

        this.mapPanelContainer = new Ext.Panel({
            layout: "card",
            region: "center",
            id: "mapPnlCntr",
            defaults: {
                // applied to each contained panel
                border:false
            },
            items: [
                this.mapPanel,
                this.googleEarthPanel
            ],
            activeItem: 0
        });

        var header = new Ext.Panel({
            region: "north",
            autoHeight: true,
            contentEl: 'header-wrapper'
        });

        Lang.registerLinks();

        this.portalItems = [
            header, {
                region: "center",
                xtype: "container",
                layout: "fit",
                border: false,
                hideBorders: true,
                items: {
                    layout: "border",
                    deferredRender: false,
                    tbar: this.toolbar,
                    items: [
                        this.mapPanelContainer,
                        westPanel
                    ],
                    ref: "../../main"
                }
            }
        ];

        GeoExplorer.superclass.initPortal.apply(this, arguments);

        if (this.config.treeconfig != undefined) {
            for (x = 0,max = this.config.treeconfig.length; x < max; x++) {
                if (this.config.treeconfig[x] != null)
                    this.addCategoryFolder(this.config.treeconfig[x].group, this.config.treeconfig[x].expanded);
            }

        }
        ;
    }