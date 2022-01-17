function () {

        if (this.layout == null) {

            var docTypeStore = new Ext.data.JsonStore({
                url: '/admin/document/get-doc-types?type=snippet',
                fields: ["id","name","module","controller","action","template"],
                root: "docTypes"
            });

            var docTypeValue = this.snippet.data.docType;
            if (docTypeValue < 1) {
                docTypeValue = "";
            }

            this.layout = new Ext.FormPanel({
                title: t('settings'),
                bodyStyle:'padding:20px 5px 20px 5px;',
                border: false,
                autoScroll: true,
                iconCls: "pimcore_icon_tab_settings",
                items: [
                    {
                        xtype:'fieldset',
                        title: t('controller_and_view_settings'),
                        collapsible: true,
                        autoHeight:true,
                        labelWidth: 200,
                        defaultType: 'textfield',
                        defaults: {width: 150},
                        items :[
                            {
                                fieldLabel: t('predefined_document_type'),
                                name: 'docType',
                                xtype: "combo",
                                displayField:'name',
                                valueField: "id",
                                store: docTypeStore,
                                editable: false,
                                lazyInit: false,
                                triggerAction: 'all',
                                width: 400,
                                listWidth: 400,
                                value: docTypeValue,
                                listeners: {
                                    "select": this.setDocumentType.bind(this)
                                }
                            },
                            {
                                fieldLabel: t('module_optional'),
                                name: 'module',
                                value: this.snippet.data.module
                            },
                            {
                                xtype:'combo',
                                fieldLabel: t('controller'),
                                displayField: 'name',
                                valueField: 'name',
                                name: "controller",
                                disableKeyFilter: true,
                                store: new Ext.data.JsonStore({
                                    autoDestroy: true,
                                    url: "/admin/document/get-available-controllers",
                                    root: "data",
                                    fields: ["name"]
                                }),
                                triggerAction: "all",
                                mode: "local",
                                id: "pimcore_document_settings_controller_" + this.snippet.id,
                                value: this.snippet.data.controller,
                                width: 250,
                                listeners: {
                                    afterrender: function (el) {
                                        el.getStore().load();
                                    }
                                }
                            },
                            {
                                xtype:'combo',
                                fieldLabel: t('action'),
                                displayField: 'name',
                                valueField: 'name',
                                name: "action",
                                disableKeyFilter: true,
                                store: new Ext.data.JsonStore({
                                    autoDestroy: true,
                                    url: "/admin/document/get-available-actions",
                                    root: "data",
                                    fields: ["name"]
                                }),
                                triggerAction: "all",
                                mode: "local",
                                value: this.snippet.data.action,
                                width: 250,
                                listeners: {
                                    "focus": function (el) {
                                        el.getStore().reload({
                                            params: {
                                                controllerName: Ext.getCmp("pimcore_document_settings_controller_" + this.snippet.id).getValue()
                                            }
                                        });
                                    }.bind(this)
                                }
                            },
                            {
                                xtype:'combo',
                                fieldLabel: t('template'),
                                displayField: 'path',
                                valueField: 'path',
                                name: "template",
                                disableKeyFilter: true,
                                store: new Ext.data.JsonStore({
                                    autoDestroy: true,
                                    url: "/admin/document/get-available-templates",
                                    root: "data",
                                    fields: ["path"]
                                }),
                                triggerAction: "all",
                                mode: "local",
                                value: this.snippet.data.template,
                                width: 250,
                                listeners: {
                                    afterrender: function (el) {
                                        el.getStore().load();
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype:'fieldset',
                        title: t('path_and_key_settings'),
                        collapsible: true,
                        autoHeight:true,
                        labelWidth: 200,
                        defaultType: 'textfield',
                        defaults: {width: 400},
                        items :[
                            {
                                fieldLabel: t('path'),
                                name: 'path',
                                value: this.snippet.data.path,
                                disabled: true
                            },
                            {
                                fieldLabel: t('key'),
                                name: 'key',
                                value: this.snippet.data.key,
                                disabled: true
                            },
                            {
                                fieldLabel: t('id'),
                                name: 'id',
                                value: this.snippet.data.id,
                                disabled: true
                            }
                        ]
                    }
                ]
            });
        }

        return this.layout;
    }