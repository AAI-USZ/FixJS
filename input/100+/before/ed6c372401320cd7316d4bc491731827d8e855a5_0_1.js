function(config) {
        
        Ext.Window.prototype.shadow = false;

        // property names for FeatureEditor and FeatureGrid
        var propertyNames = {
            // custom fied names for the fault summary table
            "fault_name": "Fault Name",
            "sec_name": "Fault Section Name",
            "episodi_is": "Episodic behaviour (yes/no)",
            "episodi_ac": "Episodic behaviour (active/inactive)",
            "length": "Length (km, pref, min, max)",
            "u_sm_d_min": "Upper seismogenic depth min (km)",
            "u_sm_d_max": "Upper seismogenic depth max (km)",
            "u_sm_d_pre": "Upper seismogenic depth pref (km)",
            "u_sm_d_com": "Upper seismogenic completeness (1, 2, 3, or 4)",
            "low_d_min": "Lower seismogenic depth min (km)",
            "low_d_max": "Lower seismogenic depth max (km)",
            "low_d_pref": "Lower seismogenic depth pref (km)",
            "low_d_com": "Lower seismogenic completeness (1, 2, 3, or 4)",
            "strike": "Strike (...\u00B0)",
            "dip_min": "Dip min (...\u00B0)",
            "dip_max": "Dip max (...\u00B0)",
            "dip_pref": "Dip pref (...\u00B0)",
            "dip_com": "Dip data completeness factor (1, 2, 3, or 4)",
            "dip_dir": "Dip direction (...\u00B0)",
	    "surface_dip": "Surface Dip",
            "down_thro": "Downthrown side (N, S, W, E or NW etc.)",
            "slip_typ": "Slip type (Reverse etc.)",
            "slip_com": "Slip type completeness (1, 2, 3, or 4)",
            "slip_r_min": "Slip rate min (mm/yr)",
            "slip_r_max": "Slip rate max (mm/yr)",
            "slip_r_pre": "Slip rate pref (mm/yr)",
            "slip_r_com": "Slip rate completeness (1, 2, 3, or 4)",
            "aseis_slip": "Aseismic-slip factor (0-1)",
            "aseis_com": "Aseismic-slip completeness (1, 2, 3, or 4)",
            "dis_min": "Displacement min (m)",
            "dis_max": "Displacement max (m)",
            "dis_pref": "Displacement pref (m)",
	    "dis_total": "Total Displacement (m)",
	    "horizontal_displacement": "Horizontal Displacement",
	    "vertical_displacement": "Horizontal Displacement",
            "re_int_min": "Recurrence interval min (yr)",
            "re_int_max": "Recurrence interval max (yr)",
            "re_int_pre": "Recurrence interval pref (yr)",
            "re_int_com": "Recurrence interval common (yr)",
	    "re_int_category": "Recurrence interval category",
            "mov_min": "Age of last movement min (yr BP)",
            "mov_max": "Age of last movement max (yr BP)",
            "mov_pref": "Age of last movement pref (yr BP)",
	    "historical_earthquake": "Historical Eartquake",
	    "pre-historical_earthquake": "Historical Eartquake",
            "all_com": "Overall data completeness (1, 2, 3, or 4)",
            "created": "Date created (date)",
            "compiler": "Compiled by (name)",
            "contrib": "Contributed by (name)",
            // custom fied names for the observations table
            "observationType": "Observation Type",
            "slipType": "Slip Type",
            "hv_ratio": "H:V Ratio",
            "rake": "Rake (deg)",
	    "net_displacement": "Net Displacement",
            "net_slip_rate_min": "Net Slip Rate Min (mm/yr)",
            "net_slip_rate_max": "Net Slip Rate Max (mm/yr)",
            "net_slip_rate_pref": "Net Slip Rate Pref (mm/yr)",
            "dip_slip_rate_min": "Dip Slip Rate Min (mm/yr)",
            "dip_slip_rate_max": "Dip Slip Rate Max (mm/yr)",
            "dip_slip_rate_pref": "Dip Slip Rate Pref (mm/yr)",
            "marker_age": "Marker Age (yrs BP)",
            "slip_rate_category": "Slip Rate Category",
            "strike_slip_rate_min": "Strike Slip Rate Min (mm/yr)",
            "strike_slip_rate_max": "Strike Slip Rate Max (mm/yr)",
            "strike_slip_rate_pref": "Strike Slip Rate Pref (mm/yr)",
            "vertical_slip_rate_min": "Vertical Slip Rate Min (mm/yr)",
            "vertical_slip_rate_max": "Vertical Slip Rate Max (mm/yr)",
            "vertical_slip_rate_pref": "Vertical Slip Rate Pref (mm/yr)",
            "site": "Site",
            "notes": "Notes",
            "summary_id": "Fault Section Summary ID",
            // custom fied names for fault trace form
            "section_name": "Fault Section Name",
            "loc_meth": "Location Method",
            "scale": "Scale",
            "accuracy": "Accuracy",
            "geomor_exp": "Geomorphic Expression",
            "notes": "Notes",
            "fault_section_id": "Fault Section Id",
            "t_feature": "Trace Feature",
            "s_feature": "Site Feature",
            // custom field names for fault source form
    	    "source_nm": "Fault Source Name",
    	    "rake_min": "Rake Min",
    	    "rake_max": "Rake Max",
    	    "rake_pref": "Rake Pref",
    	    "rake_com": "Rake Common",
    	    "magnitude": "Magnitude",
    	    "length_min": "Length Min",
    	    "length_max": "Length Max",
    	    "length_pre": "Length Pref",
    	    "mag_min": "Magnitude Min",
    	    "mag_max": "Magnitude Max",
    	    "mag_pref": "Magnitude Pref",
    	    "mom_min": "Seismic Movement Min",
    	    "mom_max": "Seismic Movement Max",
    	    "mom_pref": "Seismic Movement Pref",
    	    "fault_id": "Fault ID",
    	    "width_min": "Width Min",
    	    "width_max": "Width Max",
            "width_pref": "Width Pref",
            "area_min": "Area Min",
            "area_max": "Area Max",
            "area_pref": "Area Pref",
	    /* for site observations */
	    "fault_section_id": "Fault Section ID"
        };

	/* add a visual clue for compulsory fields */
	Ext.iterate(propertyNames, function(field) {
	    if (faultedearth.isCompulsory(field)) {
		propertyNames[field] += " <small>(*)</small>";
	    }
	});

        var tabs = new Ext.TabPanel({
        	animCollapse: true,
        	activeTab : 0,
        	border: true,
        	items: [{
                title: 'Trace Grid',
                items: [{
                    id: "trace_featuregrid",
                    layout: "fit",
                    height: 180,
                }],
            }, {
                title: 'Neotectonic Fault Section Summary Grid',
                items: [{
                    id: "summary_featuregrid",
                    layout: "fit",
                    height: 180,
                    autoScroll: true,
                }]
            }, {
                title: 'Site Observations Grid',
                items: [{
                    id: "site_featuregrid",
                    layout: "fit",
                    height: 180,
                    autoScroll: true,
                }]
            }, {
                title: 'Fault Grid',
                items: [{
                    id: "fault_featuregrid",
                    layout: "fit",
                    height: 180,
                }]
            }, {
                title: 'Fault Source Grid',
                items: [{
                    id: "source_featuregrid",
                    layout: "fit",
                    height: 180,
                }]
            }]
    	});
        
        Ext.applyIf(config, {
            proxy: "/proxy?url=",
                
            mapItems: [{
                xtype: "gx_zoomslider",
                vertical: true,
                height: 100
            }, {
                xtype: "gxp_scaleoverlay"
            }],
            portalItems: [{
                region: "center",
                layout: "border",
                tbar: {
                    id: "paneltbar",
                    items: ["-"]
                },
                items: [{
                    id: "west",
                    region: "west",
                    layout: "accordion",
                    width: 295,
                    split: true,
                    collapsible: true,
                    collapseMode: "mini",
                    header: false,
                    border: false,
                    defaults: {
                       hideBorders: true,
                       autoScroll: true
                
                    },
                    items: [{
                        id: "tree",
                        title: "Layers"
                    }, {
                        id: 'trace',
                        title: "Trace Form",
                        padding: 10
                    }, {
                		id: 'summary',
                		title: "Neotectonic Section Summary",
                		padding: 10
                	}, {
                        id: 'site',
                        title: "Site Observation Form",
                        padding: 10
                    }, {
                		id: "fault",
                		title: "Neotectonic Fault Form",
                		padding: 10
                    }, {
                    	id: "source",   
                    	title: "Fault Source",
                    	padding: 10
                    }]
                },
		"map", {
                    id: "tabs",
                    autoHeight: true,
                    region: "south",
                    border: false,
                    height: 200,
                    split: true,
                    collapseMode: "mini",
                    items:[
                        tabs
                    ]
                }]
            }],
            
            tools: [{
                actionTarget: {target: "paneltbar", index: 0},
                outputAction: 0,
                outputConfig: {
                    title: "Help",
                    width: 900,
                    height: 500,
                    modal: true,
                    bodyCfg: {
                        tag: "iframe",
                        src: "fe_documentation.html",
                        style: {border: 0}
                    }
                },
                actions: [{
                    iconCls: "icon-geoexplorer",
                    text: "Help",
                }]
            }, {
                ptype: "gxp_layertree",
                outputTarget: "tree",
            }, {
                ptype: "gxp_featuremanager",
                id: "featuremanager",
                autoLoadFeatures: true,
                autoSetLayer: false,
                paging: false,
                maxFeatures: 100
            }, {
                ptype: "gxp_featuremanager",
                id: "trace_featuremanager",
                autoLoadFeatures: true,
                autoSetLayer: false,
                paging: false,
                maxFeatures: 100
            }, {
                ptype: "gxp_featuregrid",
                alwaysDisplayOnMap: true,
                selectOnMap: true,
                id: "trace_grid",
                displayMode: "selected",
                featureManager: "trace_featuremanager",
                outputTarget: "trace_featuregrid",
                outputConfig: {
                    id: "trace_grid",
                    loadMask: true,
                    propertyNames: propertyNames
                },
                controlOptions: {
                    multiple: true,
                }
            }, {
                ptype: "gxp_featuremanager",
                id: "summary_featuremanager",
                autoLoadFeatures: true,
                autoSetLayer: false,
                paging: false,
                maxFeatures: 100
            }, {
                ptype: "gxp_featuregrid",
                alwaysDisplayOnMap: true,
                selectOnMap: true,
                displayMode: "selected",
                autoHeight: true,   
                featureManager: "summary_featuremanager",
                outputTarget: "summary_featuregrid",
                outputConfig: {
                    id: "summary_grid",
                    loadMask: true,
                    propertyNames: propertyNames
                },
                controlOptions: {
                    multiple: true,
                }
            }, {
                ptype: "gxp_featuremanager",
                id: "site_featuremanager",
                autoLoadFeatures: true,
                autoSetLayer: false,
                paging: false,
                maxFeatures: 100
            }, {
                ptype: "gxp_featuregrid",
                alwaysDisplayOnMap: true,
                selectOnMap: true,
                displayMode: "selected",
                featureManager: "site_featuremanager",
                outputTarget: "site_featuregrid",
                outputConfig: {
                    id: "site_grid",
                    loadMask: true,
                    propertyNames: propertyNames
                },
                controlOptions: {
                    multiple: true,
                }
            }, {
                ptype: "gxp_featuremanager",
                id: "fault_featuremanager",
                autoLoadFeatures: true,
                autoSetLayer: false,
                paging: false,
                maxFeatures: 100
            }, {
                ptype: "gxp_featuregrid",
                alwaysDisplayOnMap: true,
                selectOnMap: true,
                displayMode: "selected",
                featureManager: "fault_featuremanager",
                outputTarget: "fault_featuregrid",
                outputConfig: {
                    id: "fault_grid",
                    loadMask: true,
                    propertyNames: propertyNames
                },
                controlOptions: {
                    multiple: true,
                }
            }, {
                ptype: "gxp_featuremanager",
                id: "source_featuremanager",
                autoLoadFeatures: true,
                autoSetLayer: false,
                paging: false,
                maxFeatures: 100
            }, {
                ptype: "gxp_featuregrid",
                alwaysDisplayOnMap: true,
                ignoreFields: ["episodi_is"],
                selectOnMap: true,
                displayMode: "selected",
                featureManager: "source_featuremanager",
                outputTarget: "source_featuregrid",
                outputConfig: {
                    id: "source_grid",
                    loadMask: true,
                    propertyNames: propertyNames
                },
                controlOptions: {
                    multiple: true,
                }
            }, {
                ptype: "app_traceform",
                id: "traceform",
                featureManager: "trace_featuremanager",
                featureEditor: "trace_featureeditor",
                outputTarget: "trace"
            }, {
                ptype: "gxp_featureeditor",
		autoLoadFeatures: true,
                id: "trace_featureeditor",
                featureManager: "trace_featuremanager",
                actionTarget: "traceform_tooltarget",
                createFeatureActionText: "Draw",
                editFeatureActionText: "Modify",
		snappingAgent: "snapping-agent",
                outputConfig: {
                    propertyNames: propertyNames
                }
            }, {
                ptype: "app_summaryform",
                id: "summaryform",
                featureManager: "summary_featuremanager",
                featureEditor: "featureeditor",
                outputTarget: "summary"
            }, {
                ptype: "gem_observation_featureeditor",
		actionTarget: "summaryform_tooltarget",
		featureManager: "summary_featuremanager",
		modifyOnly: true,
                outputConfig: {
                    propertyNames: propertyNames
                }
            }, {
                ptype: "app_siteform",
                id: "siteform",
                featureManager: "site_featuremanager",
                featureEditor: "site_featureeditor",
                outputTarget: "site"
            }, {
                ptype: "gem_observation_featureeditor",
                id: "site_featureeditor",
                featureManager: "site_featuremanager",
                actionTarget: "siteform_tooltarget",
                outputConfig: {
                    propertyNames: propertyNames
                }
            }, {
                ptype: "app_faultform",
                id: "faultform",
                featureManager: "fault_featuremanager",
                featureEditor: "featureeditor",
                outputTarget: "fault"
            }, {
                ptype: "gem_observation_featureeditor",
                id: "fault_featureeditor",
                featureManager: "fault_featuremanager",
                actionTarget: "faultform_tooltarget",
                outputConfig: {
                    propertyNames: propertyNames
                }
            }, {
                ptype: "app_sourceform",
                id: "sourceform",
                featureManager: "source_featuremanager",
                featureEditor: "featureeditor",
                outputTarget: "source",
            }, {
                ptype: "gem_observation_featureeditor",
                id: "faultsource_featureeditor",
                featureManager: "source_featuremanager",
                actionTarget: "sourceform_tooltarget",
                readOnly: true,
                outputConfig: {
                    propertyNames: propertyNames
                }
            }, {
        		ptype: "gxp_legend",
        		outputTarget: "west",
        		outputConfig: {
        		    title: this.legendTabTitle,
        		    autoScroll: true
        		}
        	}, {
                ptype: "gxp_googlegeocoder",
                outputTarget: "paneltbar",
                outputConfig: {
                    emptyText: "Search for a location ..."
                }
            }, {
		         ptype: "gxp_wmsgetfeatureinfo",
		         actionTarget: "paneltbar",
	             outputConfig: {
	                 width: 400
	                 }
	         }, {
            	ptype: "gxp_measure",
            	actionTarget: {target: "paneltbar", index: 6},
            	toggleGroup: "main"
            }, {
            	ptype: "gxp_zoomtoextent",
            	actionTarget: "paneltbar"
            }, {
            	ptype: "gxp_zoom",
            	actionTarget: "paneltbar"
            }, {
            	ptype: "gxp_navigationhistory",
            	actionTarget: "paneltbar"
            }, {
                ptype: "gxp_zoomtoselectedfeatures",
                featureManager: "trace_featuremanager",
                actionTarget: "traceform_tooltarget",
                tooltip: "Zoom to selected closure"
            }, {
                ptype: "gxp_zoomtoselectedfeatures",
                featureManager: "summary_featuremanager",
                actionTarget: "summaryform_tooltarget",
                tooltip: "Zoom to selected closure"
            }, {
                ptype: "gxp_zoomtoselectedfeatures",
                featureManager: "site_featuremanager",
                actionTarget: "siteform_tooltarget",
                tooltip: "Zoom to selected closure"
            }, {
                ptype: "gxp_zoomtoselectedfeatures",
                featureManager: "fault_featuremanager",
                actionTarget: "faultform_tooltarget",
                tooltip: "Zoom to selected closure"
            }, {
                ptype: "gxp_zoomtoselectedfeatures",
                featureManager: "source_featuremanager",
                actionTarget: "sourceform_tooltarget",
                tooltip: "Zoom to selected closure"
            }, {
            	ptype: "gxp_snappingagent",
            	id: "snapping-agent",
            	targets: [{
            		source: "local",
            		name: "geonode:observations_trace"
            	}]
    	     }]
        });

        FaultedEarth.superclass.constructor.apply(this, arguments);
    }