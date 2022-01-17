function (config) {

        var portletMenu = [];
        var portlets = Object.keys(pimcore.layout.portlets);

        for (var i = 0; i < portlets.length; i++) {
            if (portlets[i] != "abstract") {
                portletMenu.push({
                    text: pimcore.layout.portlets[portlets[i]].prototype.getName(),
                    iconCls: pimcore.layout.portlets[portlets[i]].prototype.getIcon(),
                    handler: this.addPortlet.bind(this, pimcore.layout.portlets[portlets[i]].prototype.getType())
                });
            }
        }

        if (!this.panel) {
            this.panel = new Ext.Panel({
                id: "pimcore_portal",
                title: t("welcome"),
                border: false,
                iconCls: "pimcore_icon_welcome",
                closable:true,
                autoScroll: true,
                tbar: {
                    items: ["->",{
                        text: t("add_portlet"),
                        iconCls: "pimcore_icon_portlet_add",
                        menu: portletMenu
                    }]
                },
                items: [
                    {
                        xtype:'portal',
                        region:'center',
                        autoScroll: false,
                        autoHeight: true,
                        items:[
                            {
                                id: "pimcore_portal_col0",
                                columnWidth:.5,
                                style:'padding:10px',
                                items:[config[0]]
                            },
                            {
                                id: "pimcore_portal_col1",
                                columnWidth:.5,
                                style:'padding:10px 10px 10px 0',
                                items:[config[1]]
                            }
                        ]
                        ,listeners: {
                        'drop': function(e) {
                            Ext.Ajax.request({
                                url: "/admin/portal/reorder-widget",
                                params: {
                                    type: e.panel.initialConfig.widgetType,
                                    column: e.columnIndex,
                                    row: e.position
                                }
                            });
                        }
                    }
                    }
                ]
            });

            this.panel.on("destroy", function () {
                pimcore.globalmanager.remove("layout_portal");
            }.bind(this));

            var tabPanel = Ext.getCmp("pimcore_panel_tabs");
            tabPanel.add(this.panel);
            tabPanel.activate("pimcore_portal");

            pimcore.layout.refresh();
        }

        return this.panel;
    }