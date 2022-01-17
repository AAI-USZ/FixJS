function () {

        if (this.layout == null) {

            var docTypeStore = new Ext.data.JsonStore({
                url: '/admin/document/get-doc-types?type=page',
                fields: ["id","name","controller","action","template"],
                root: "docTypes"
            });


            var addUrlAlias = function (url, id) {

                if(typeof url != "string") {
                    url = "";
                }
                if(typeof id != "string" && typeof id != "number") {
                    id = "";
                }

                var count = this.urlAliasPanel.findByType("textfield").length+1;

                var compositeField = new Ext.Container({
                    hideLabel: true,
                    style: "padding-bottom:5px;",
                    items: [{
                        xtype: "textfield",
                        value: url,
                        width: 500,
                        name: "redirect_url_" + count,
                        style: "float:left;margin-right:5px;",
                        enableKeyEvents: true,
                        listeners: {
                            keyup: function () {
                                if(this.getValue().indexOf("http") >= 0) {
                                    try {
                                        var newUrl = "@" + parse_url(this.getValue(), "path") + "@";
                                        this.setValue(newUrl);
                                    } catch (e) {
                                        console.log(e);
                                    }
                                }
                            }
                        }
                    },{
                        xtype: "hidden",
                        value: id,
                        name: "redirect_id_"  + count
                    }]
                });

                compositeField.add([{
                    xtype: "button",
                    iconCls: "pimcore_icon_delete",
                    style: "float:left;",
                    handler: function (compositeField, el) {
                        this.urlAliasPanel.remove(compositeField);
                        this.urlAliasPanel.doLayout();
                    }.bind(this, compositeField)
                },{
                    xtype: "box",
                    style: "clear:both;"
                }]);


                this.urlAliasPanel.add(compositeField);

                this.urlAliasPanel.doLayout();
            }.bind(this);

            var user = pimcore.globalmanager.get("user");

            this.urlAliasPanel = new Ext.form.FieldSet({
                title: t("path_aliases") + " (" + t("redirects") + ")",
                collapsible: false,
                autoHeight:true,
                width: 700,
                style: "margin-top: 20px;",
                disabled: !user.isAllowed("redirects"),
                items: [],
                buttons: [{
                    text: t("add"),
                    iconCls: "pimcore_icon_add",
                    handler: addUrlAlias
                }]
            });

            for(var r=0; r<this.page.data.redirects.length; r++) {
                addUrlAlias(this.page.data.redirects[r].source, this.page.data.redirects[r]["id"]);
            }

            this.layout = new Ext.FormPanel({
                title: t('settings'),
                bodyStyle:'padding:20px 5px 20px 5px;',
                layout: "pimcoreform",
                border: false,
                autoScroll: true,
                iconCls: "pimcore_icon_tab_settings",
                items: [
                    {
                        xtype:'fieldset',
                        title: t('name_and_meta_data'),
                        collapsible: true,
                        autoHeight:true,
                        labelWidth: 200,
                        defaults: {width: 500},
                        defaultType: 'textarea',
                        items :[
                            {
                                fieldLabel: t('title'),
                                name: 'title',
                                maxLength: 255,
                                height: 51,
                                value: this.page.data.title
                            },
                            {
                                fieldLabel: t('description'),
                                maxLength: 255,
                                height: 51,
                                name: 'description',
                                value: this.page.data.description
                            },
                            {
                                fieldLabel: t('keywords'),
                                name: 'keywords',
                                maxLength: 255,
                                height: 51,
                                value: this.page.data.keywords
                            }
                        ]
                    },
                    {
                        xtype:'fieldset',
                        title: t('pretty_url') + " / " + t("redirects"),
                        collapsible: true,
                        autoHeight:true,
                        labelWidth: 300,
                        defaultType: 'textfield',
                        items :[
                            {
                                fieldLabel: t('pretty_url_label'),
                                name: 'prettyUrl',
                                maxLength: 255,
                                width: 400,
                                value: this.page.data.prettyUrl,
                                validator: function (url) {
                                    if(url.charAt(0) == "/") {
                                        var result = url.match(/[a-zA-Z0-9_.\-\/]+/);
                                        if (result == url) {
                                            return true;
                                        }
                                    } else if (url.length < 1) {
                                        return true;
                                    }
                                    return t("path_error_message");
                                }
                            }, this.urlAliasPanel
                        ]
                    },
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
                                triggerAction: 'all',
                                width: 400,
                                listWidth: 400,
                                listeners: {
                                    "select": this.setDocumentType.bind(this)
                                }
                            },
                            {
                                fieldLabel: t('module_optional'),
                                name: 'module',
                                value: this.page.data.module
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
                                id: "pimcore_document_settings_controller_" + this.page.id,
                                value: this.page.data.controller,
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
                                value: this.page.data.action,
                                width: 250,
                                listeners: {
                                    "focus": function (el) {
                                        el.getStore().reload({
                                            params: {
                                                controllerName: Ext.getCmp("pimcore_document_settings_controller_" + this.page.id).getValue()
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
                                value: this.page.data.template,
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
                                value: this.page.data.path,
                                disabled: true
                            },
                            {
                                fieldLabel: t('key'),
                                name: 'key',
                                value: this.page.data.key,
                                disabled: true
                            },
                            {
                                fieldLabel: t('id'),
                                name: 'id',
                                value: this.page.data.id,
                                disabled: true
                            }
                        ]
                    }
                ]
            });
        }

        return this.layout;
    }