function() {
        var geoEx = this;
        var initialSourceId, source, data = [];
        for (var id in this.layerSources) {
            source = this.layerSources[id];
            if (source instanceof gxp.plugins.GeoNodeSource && source.url.replace(this.urlPortRegEx, "$1/").indexOf(this.localGeoServerBaseUrl.replace(this.urlPortRegEx, "$1/")) === 0) {
                //do nothing
            } else {
                if (source.store) {
                    data.push([id, this.layerSources[id].title || id]);
                }
            }
        }

        if (data[0] && data[0][0])
            initialSourceId = data[0][0];


        var sources = new Ext.data.ArrayStore({
            fields: ["id", "title"],
            data: data
        });

        var expander = new GeoExplorer.CapabilitiesRowExpander({
            ows: this.localGeoServerBaseUrl + "ows"
        });


        var addLocalLayers = function() {
            if (!this.mapID) {
                Ext.Msg.alert("Save your Map View", "You must save this map view before uploading your data");
            }
            else
                document.location.href = "/data/upload?map=" + this.mapID;
        };


        var addLayers = function() {
            var key = sourceComboBox.getValue();
            var layerStore = this.mapPanel.layers;
            var source = this.layerSources[key];
            var records = capGridPanel.getSelectionModel().getSelections();
            this.addLayerAjax(source, key, records);
        };

        var source = null;

        if (initialSourceId) {
            source = this.layerSources[initialSourceId];
            source.store.filterBy(function(r) {
                return !!source.getProjection(r);
            }, this);
        }

        var capGridPanel = new Ext.grid.GridPanel({
            store: source != null ? source.store : [],
            height:300,
            region:'center',
            autoScroll: true,
            autoExpandColumn: "title",
            plugins: [expander],
            colModel: new Ext.grid.ColumnModel([
                expander,
                {id: "title", header: "Title", dataIndex: "title", sortable: true}
            ]),
            listeners: {
                rowdblclick: addLayers,
                scope: this
            }
        });

        var sourceComboBox = new Ext.form.ComboBox({
            store: sources,
            valueField: "id",
            displayField: "title",
            triggerAction: "all",
            editable: false,
            allowBlank: false,
            forceSelection: true,
            mode: "local",
            value: initialSourceId,
            listeners: {
                select: function(combo, record, index) {
                    var source = this.layerSources[record.get("id")];
                    var store = source.store;
                    store.setDefaultSort('title', 'asc');
                    store.filterBy(function(r) {
                        return !!source.getProjection(r);
                    }, this);
                    expander.ows = store.url;
                    capGridPanel.reconfigure(store, capGridPanel.getColumnModel());
                    // TODO: remove the following when this Ext issue is addressed
                    // http://www.extjs.com/forum/showthread.php?100345-GridPanel-reconfigure-should-refocus-view-to-correct-scroller-height&p=471843
                    capGridPanel.getView().focusRow(0);
                },
                scope: this
            }
        });


        var addWmsButton = new Ext.Button({
            text: this.layerAdditionLabel,
            iconCls: 'icon-add',
            cls: 'x-btn-link-medium x-btn-text',
            handler: function() {
                newSourceWindow.show();
            }
        });


        var app = this;
        var newSourceWindow = new gxp.NewSourceWindow({
            modal: true,
            listeners: {
                "server-added": function(url, type) {
                    newSourceWindow.setLoading();
                    this.addLayerSource({
                        config: {url: url, ptype: type},
                        callback: function(id) {
                            // add to combo and select
                            var record = new sources.recordType({
                                id: id,
                                title: this.layerSources[id].title || "Untitled" // TODO: titles
                            });
                            sources.insert(0, [record]);
                            sourceComboBox.onSelect(record, 0);
                            newSourceWindow.hide();
                        },
                        failure: function() {
                            // TODO: wire up success/failure
                            newSourceWindow.setError("Error contacting server.\nPlease check the url and try again.");
                        },
                        scope: this
                    });
                },
                "rssdialog": function(){
                    if (!this.feedDialog) {
                        this.feedDialog = new gxp.FeedSourceDialog({
                            title:"Add a GeoRSS Feed",
                            closeAction: "hide",
                            target: this,
                            listeners: {
                                "feed-added": function(ptype, config){

                                    var sourceConfig = {"config":{"ptype":ptype}};
                                    if (config.url) {
                                        sourceConfig.config["url"] = config.url;
                                    }
                                    var source = this.addLayerSource(sourceConfig);
                                    config.source = source.id;
                                    var feedRecord = source.createLayerRecord(config);


                                    this.mapPanel.layers.add([feedRecord]);
                                    this.addCategoryFolder(feedRecord.get("group"), "true");
                                    this.reorderNodes(feedRecord.getLayer());
                                    this.treeRoot.findDescendant("layer", feedRecord.getLayer()).select();
                                }, scope: this
                            }, scope: this
                        });
                    }
                    this.feedDialog.show();
                    newSourceWindow.hide();
                    this.searchWindow.hide();
                },
                scope: this
            },
            // hack to get the busy mask so we can close it in case of a
            // communication failure
            addSource: function(url, success, failure, scope) {
                app.busyMask = scope.loadMask;
            }
        });


        var addLayerButton = new Ext.Button({
            text: "Add Layers",
            iconCls: "gxp-icon-addlayers",
            handler: addLayers,
            scope : this
        });


        var sourceAdditionLabel = { xtype: 'box', autoEl: { tag: 'span',  html: this.layerSelectionLabel }};

        var sourceForm = new Ext.Panel({
            frame:false,
            border: false,
            region: 'north',
            height:40,
            layout: new Ext.layout.HBoxLayout({
                defaultMargins: {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 0
                }
            }),
            items: [sourceAdditionLabel, sourceComboBox, {xtype: 'spacer', width:20 }, addWmsButton]
        });


        var addLayerForm = new Ext.Panel({
            frame:false,
            border: false,
            region: 'south',
            layout: new Ext.layout.HBoxLayout({
                defaultMargins: {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 0
                }
            }),
            items: [addLayerButton]
        });

        this.capGrid = new Ext.Panel({
            autoScroll: true,
            title: 'External Data',
            header: false,
            layout: 'border',
            border: false,
            renderTo: 'externalDiv',
            padding:'2 0 0 20',
            items: [sourceForm, capGridPanel, addLayerForm],
            listeners: {
                hide: function(win) {
                    capGridPanel.getSelectionModel().clearSelections();
                }
            }
        });
    }