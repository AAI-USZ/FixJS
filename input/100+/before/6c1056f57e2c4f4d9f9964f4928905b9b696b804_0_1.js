function(){
        Ext.applyIf(this, this.defaultConfig);

        this.title = OpenLayers.i18n('thumbnails');
        this.tools = [{
            id : 'refresh',
            handler : function (e, toolEl, panel, tc) {
                panel.reload(panel, panel.metadataId);
            }
        }];

        var tpl = new Ext.XTemplate('<ul>', 
                                        '<tpl for=".">', 
                                            '<li class="thumbnail">', 
                                                '<img class="thumb-small" src="{href}" title="{desc}"><br/>',
                                                '<a rel="lightbox-set" class="md-mn lightBox" href="{href}"></a>', 
                                                '<span>{desc}</span>', 
                                            '</li>', 
                                        '</tpl>', 
                                    '</ul>');
        
        this.addButton = new Ext.Button({
                text: OpenLayers.i18n('addThumbnail'),
                iconCls: 'thumbnailAddIcon',
                handler: this.uploadThumbnail,
                scope: this
            });
        this.delButton = new Ext.Button({
                text: OpenLayers.i18n('removeSelected'),
                iconCls: 'thumbnailDelIcon',
                disabled: true,
                handler: this.removeThumbnail,
                scope: this
            });
        this.bbar = new Ext.Toolbar({
            items: [this.addButton, this.delButton]
        });
        
        this.store = new GeoNetwork.data.MetadataThumbnailStore(this.getThumbnail, {id: this.metadataId});
        this.store.on('load', function(){
            this.dataView.fireEvent('selectionchange', this);
            Ext.ux.Lightbox.register('a[rel^=lightbox-set]', true);
            }, this);
        this.idField = new Ext.form.TextField({
            xtype: 'textfield',
            name: 'id',
            value: this.metadataId,
            hidden: true
        });
        this.versionField = new Ext.form.TextField({
            name: 'version',
            value: this.versionId,
            hidden: true
        });
        var tip = new Ext.slider.Tip({
            getText: function(thumb){
                return String.format('<b>{0} px</b>', thumb.value);
            }
        });
        
        this.uploadForm = new Ext.form.FormPanel({
                    fileUpload: true,
                    items: [this.idField, this.versionField, {
                        xtype: 'textfield',
                        name: 'scalingDir',
                        value: 'width',
                        hidden: true
                    }, {
                        xtype: 'textfield',
                        name: 'smallScalingDir',
                        value: 'width',
                        hidden: true
                    }, {
                        xtype: 'fileuploadfield',
                        emptyText: OpenLayers.i18n('selectImage'),
                        fieldLabel: OpenLayers.i18n('image'),
                        name: 'fname',
                        allowBlank: false,
                        buttonText: '',
                        buttonCfg: {
                            iconCls: 'thumbnailAddIcon'
                        }
                    }, {
                        xtype: 'radio',
                        checked: true,
                        fieldLabel: 'Type',
                        boxLabel: OpenLayers.i18n('large'),
                        name: 'type',
                        value: 'large'
                    }, {
                        xtype: 'radio',
                        fieldLabel: '',
                        boxLabel: OpenLayers.i18n('small'),
                        name: 'type',
                        value: 'small'
                    }, {
                        xtype: 'sliderfield',
                        fieldLabel: OpenLayers.i18n('scalingFactor'),
                        name: 'scalingFactor',
                        value: 1000,
                        minValue: 400,
                        maxValue: 1800,
                        increment: 200
                    }, {
                        xtype: 'checkbox',
                        checked: true,
                        hideLabel: true,
                        fieldLabel: '',
                        labelSeparator: '',
                        boxLabel: OpenLayers.i18n('createSmall'),
                        name: 'createSmall',
                        value: 'true'
                    },{
                        xtype: 'sliderfield',
                        fieldLabel: OpenLayers.i18n('smallScalingFactor'),
                        name: 'smallScalingFactor',
                        value: 180,
                        minValue: 100,
                        maxValue: 220,
                        increment: 20
                    }],
                    buttons: [{
                        text: OpenLayers.i18n('upload'),
                        formBind: true,
                        iconCls: 'thumbnailGoIcon',
                        scope: this,
                        handler: function(){
                            if (this.uploadForm.getForm().isValid()) {
                                var panel = this;
                                this.uploadForm.getForm().submit({
                                    url: this.setThumbnail,
                                    waitMsg: OpenLayers.i18n('uploading'),
                                    success: function(fp, o){
                                          panel.editor.init(panel.metadataId);
                                          panel.thumbnailUploadWindow.hide();
                                    }
                                });
                            }
                        }
                    }, {
                        text: OpenLayers.i18n('reset'),
                        iconCls: 'cancel',
                        scope: this,
                        handler: function(){
                            this.uploadForm.getForm().reset();
                        }
                    }]
                });

        GeoNetwork.editor.ThumbnailPanel.superclass.initComponent.call(this);
        
        this.dataView = new Ext.DataView({
            autoHeight: true,
            autoWidth: true,
            store: this.store,
            tpl: tpl,
            singleSelect: true,
            selectedClass: 'thumbnail-selected',
            overClass:'thumbnail-over',
            itemSelector: 'li.thumbnail',
            emptyText: OpenLayers.i18n('noimages'),
            listeners: {
                selectionchange: this.selectionChangeEvent,
                scope: this
            }
        });
        this.add(this.dataView);
    
        if (this.metadataId) {
            this.reload(this, this.metadataId);
        }
        
        this.editor.on('editorClosed', this.clear, this);
        this.editor.on('metadataUpdated', this.reload, this);
        this.on('expand', this.reload);
    }