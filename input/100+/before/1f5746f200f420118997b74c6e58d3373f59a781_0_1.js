function(featureInfo, featureMeta) {
        if (this.target.selectControl.popup) {
            return;
        }
            var ep = Ext.getCmp(this.featurePanel);
        var gp = Ext.getCmp(this.attributePanel);

        if (ep.hidden) {
            ep.show();
            ep.alignTo(document, 'tr-tr');
        }
        gp.removeAll(true);

        var currentFeatures = featureInfo;
        //console.log('display # features:' + featureInfo.length);
        var reader = new Ext.data.JsonReader({}, [
            {name: 'wm_layer_title'},
            {name: 'wm_layer_name'},
            {name: 'wm_layer_id'},
            {name: 'wm_layer_type'}
        ]);

        var tool = this;
        var gridPanel = new Ext.grid.GridPanel({
            tbar:[
                {
                    xtype:'button',
                    text:'<span class="x-btn-text">Reset</span>',
                    qtip: 'Clear all features',
                    handler: function(brn, e) {
                        tool.reset(true);
                    },
                    text: 'Reset'
                }
            ],
            id: 'getFeatureInfoGrid',
            header: false,
            store:new Ext.data.GroupingStore({
                reader: reader,
                data: currentFeatures,
                groupField:'wm_layer_title',
                sortInfo:{field: 'wm_layer_id', direction: "DESC"}
            }),
            columns:[
                { id:'wm_layer_id', sortable:false, header:'FID', dataIndex:'wm_layer_id', hidden:true},
                { header: 'Name', sortable:true, dataIndex:'wm_layer_name', width:190 },
                { header:'Feature Type', dataIndex:'wm_layer_type', width:0, hidden:true },
                { header:'Layer', sortable:false, dataIndex:'wm_layer_title', width:0, hidden:true }
            ],
            view: new Ext.grid.GroupingView({
                //forceFit:true,
                groupTextTpl: '{group}',
                style: 'width: 425px'
            }),
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: {
                        fn: function(sm, rowIndex, rec) {
                            //console.log('displaySingleResult call');
                            tool.displaySingleResult(currentFeatures, rowIndex, rec.data, featureMeta[rec.data.wm_layer_type]);
                        }
                    }
                }
            }),
            layout: 'fit',
            frame:false,
            collapsible: true,
            iconCls: 'icon-grid',
            autoHeight:true,
            style: 'width: 425px',
            width: '400'

            //autoExpandColumn:'name',
        });


        gp.add(gridPanel);
        gp.doLayout();
        //gridPanel.addListener( 'afterlayout', function(){this.getSelectionModel().selectFirstRow()});
        //var t = setTimeout(function(){gridPanel.getSelectionModel().selectFirstRow()},1000);

        gridPanel.getSelectionModel().selectFirstRow();
        //var recordId = gridPanel.store.find('wm_layer_id', currentFeatures.length - 1);
        //gridPanel.getSelectionModel().selectRow(recordId);


    }