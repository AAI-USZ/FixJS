function createToolCfg(config, toggleGroup) {
            var checkListener = function(field, check) {
                if (check === false) {
                    var form = field.ownerCt.getForm();
                    var inMap = form.findField('in_map').getValue(),
                        inTimeline = form.findField('in_timeline').getValue();
                    if (inMap === false && inTimeline === false) {
                        field.setValue(true);
                    }
                }
            };
            return (config.tools || []).concat({
                ptype: "gxp_mapproperties",
                actionTarget: {target: "paneltbar", index: 0}
            }, {
                ptype: "gxp_zoom",
                actionTarget: {target: "paneltbar", index: 4}
            }, {
                ptype: "gxp_navigationhistory",
                actionTarget: {target: "paneltbar", index: 6}
            }, {
                ptype: "gxp_zoomtoextent",
                actionTarget: {target: "paneltbar", index: 8}
            }, {
                ptype: "gxp_layermanager",
                outputConfig: {
                    id: "treecontent",
                    autoScroll: true,
                    tbar: {id: 'treetbar'}
                },
                outputTarget: "westpanel"
            }, {
                ptype: "gxp_zoomtolayerextent",
                actionTarget: "treecontent.contextMenu"
            }, {
                ptype: "gxp_addlayers",
                actionTarget: "treetbar",
                createExpander: function() {
                    return new GeoExplorer.CapabilitiesRowExpander({
                        ows: config.localGeoServerBaseUrl + "ows"
                    });
                }
            }, {
                ptype: "gxp_removelayer",
                actionTarget: ["treetbar", "treecontent.contextMenu"]
            }, {
                ptype: "app_layerproperties",
                layerPanelConfig: {
                    "gxp_wmslayerpanel": {rasterStyling: true}
                },
                actionTarget: ["treetbar", "treecontent.contextMenu"]
            }, {
                ptype: "gxp_styler",
                rasterStyling: true,
                actionTarget: ["treetbar", "treecontent.contextMenu"]
            }, {
                ptype: "gxp_print",
                includeLegend: true,
                printCapabilities: window.printCapabilities,
                actionTarget: {target: "paneltbar", index: 3}
            }, {
                ptype: "gxp_timeline",
                id: "timeline-tool",
                outputTarget: "timeline-container",
                outputConfig: {
                    title: null
                },
                featureEditor: "annotations_editor",
                playbackTool: "playback-tool"
            }, {
                ptype: "gxp_timelinelayers",
                timelineTool: "timeline-tool",
                actionTarget: "timeline-container.tbar"
            }, {
                ptype: "app_notes",
                createLayerUrl: "/data/create_annotations_layer/{mapID}",
                layerNameTpl: "_map_{mapID}_annotations",
                workspacePrefix: "geonode",
                featureEditor: "annotations_editor",
                outputConfig: {
                    id: 'notes_menu'
                },
                actionTarget: {target: "paneltbar", index: 12}
            },{
                ptype: "gxp_featuremanager",
                id: "general_manager",
                paging: false,
                autoSetLayer: true
            }, {
                ptype: "gxp_featureeditor",
                toggleGroup: toggleGroup,
                featureManager: "general_manager",
                autoLoadFeature: true,
                actionTarget: {target: "paneltbar", index: 13}
            }, {
                ptype: "gxp_featuremanager",
                id: "annotations_manager",
                autoLoadFeatures: true,
                autoSetLayer: false,
                paging: false
            }, {
                ptype: "gxp_featureeditor",
                id: "annotations_editor",
                closeOnSave: true,
                toggleGroup: toggleGroup,
                supportAbstractGeometry: true,
                showSelectedOnly: false,
                supportNoGeometry: true,
                outputConfig: {
                    allowDelete: true,
                    width: 325,
                    editorPluginConfig: {
                        ptype: "gxp_editorform",
                        bodyStyle: "padding: 5px 5px 0",
                        autoScroll: true,
                        fieldConfig: {
                            'title': {fieldLabel: "Title", allowBlank: false, width: '100%', anchor: '99%'},
                            'content': {fieldLabel: "Description", xtype: "textarea", width: '100%', anchor: '99%', grow: true},
                            'start_time': {xtype: 'gxp_datetimefield', fieldLabel: "Start time", allowBlank: false, msgTarget: 'qtip'},
                            'end_time': {xtype: 'gxp_datetimefield', fieldLabel: "End time <span class='optional-form-label'>(optional)</span>", msgTarget: 'qtip'},
                            'in_timeline': {value: true, boxLabel: "Include in timeline", listeners: {'check': checkListener}},
                            'in_map': {value: true, boxLabel: "Include in map", listeners: {'check': checkListener}},
                            'appearance': {xtype: "combo", value: 'c-c?', fieldLabel: "Position", emptyText: "Only needed for Events", comboStoreData: [
                                ['tl-tl?', 'Top left'], 
                                ['t-t?', 'Top center'],
                                ['tr-tr?', 'Top right'],
                                ['l-l?', 'Center left'],
                                ['c-c?', 'Center'],
                                ['r-r?', 'Center right'],
                                ['bl-bl?', 'Bottom left'],
                                ['b-b?', 'Bottom center'],
                                ['br-br?', 'Bottom right']
                            ]}
                        }
                    }
                },
                featureManager: "annotations_manager",
                actionTarget: "notes_menu",
                createFeatureActionText: "Add note",
                iconClsAdd: 'gxp-icon-addnote',
                editFeatureActionText: "Edit note"
            });
	    }