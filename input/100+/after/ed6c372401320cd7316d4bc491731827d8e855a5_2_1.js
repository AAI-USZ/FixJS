function(config) {
	var layerRecordName = this.layerRecordName;
        return FaultedEarth.SiteForm.superclass.addOutput.call(this, {
            xtype: "form",
            labelWidth: 110,
            defaults: {
                anchor: "100%"
            },
            items: [{
                xtype: "textfield",
                ref: "nameContains",
                fieldLabel: "Search for key word in notes",
                validationDelay: 500,
                listeners: {
                    "valid": this.updateFilter,
                    scope: this
                }
             }, {
                xtype: "container",
                layout: "hbox",
                cls: "composite-wrap",
                fieldLabel: "Create or modify a site observation",
                items: [{
                    id: "site_" + layerRecordName + "_form_tooltarget",
                    xtype: "container",
                    cls: "toolbar-spaced",
                    layout: "toolbar"
                }]
            }, {
                xtype: "container",
                layout: "hbox",
                cls: "composite-wrap",
                fieldLabel: "Upload a Site Observation",
                items: [{
                    xtype: "button",
                    text: "Upload",
                    iconCls: "icon-import",
                    handler: function() {
                        var featureManager = this.target.tools[this.featureManager];
                        if (this.output[0].newFeaturesOnly.getValue()) {
                            featureManager.on("clearfeatures", this.showUploadWindow, this, {single: true});
                            featureManager.clearFeatures();
                        } else {
                            this.showUploadWindow();
                        }
                    },
                    scope: this
                }]
            }, {
                xtype: "box",
                autoEl: {
                    tag: "p",
                    cls: "x-form-item"
                },
                html: "To associate site observations to a Fault Section,<b> select Neotecnonic section summary tab</b>, get a neotecnonic section id, then edit the site observation and fill in the fault section id field with this value."
            }],
            listeners: {
                "added": function(cmp, ct) {
                    ct.on({
                        "expand": function() { this.activate(); },
                        "collapse": function() { this.deactivate(); },
                        scope: this
                    });
                },
                scope: this
            }
        });
    }