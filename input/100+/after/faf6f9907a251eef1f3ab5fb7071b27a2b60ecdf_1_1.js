function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    hideCollapseTool: false,
                    overlapHeader: false,
                    preventHeader: false,
                    title: 'Current Setting',
                    titleCollapse: false,
                    databind: {
                        autoload: true,
                        model: 'scsidisk'
                    },
                    region: 'center',
                    split: true,
                    viewConfig: {

                    },
                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                    }),
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    itemId: 'delete',
                                    text: 'Delete'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'refresh',
                                    text: 'Refresh'
                                }
                            ]
                        }
                    ],
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'blockdev',
                            text: 'Blockdev'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'capacity',
                            text: 'Capacity'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'vendor',
                            text: 'Vendor'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'product',
                            text: 'Product'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'revision',
                            text: 'Revision'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'fixed',
                            text: 'Fixed'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'host',
                            text: 'Host'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'scsi_device',
                            text: 'Scsi_device'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    minWidth: 292,
                    width: 292,
                    autoScroll: true,
                    region: 'west',
                    split: true,
                    items: [
                        {
                            xtype: 'form',
                            border: 0,
                            bodyCls: 'x-border-layout-ct',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'HBA setting',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            itemId: 'scsihost',
                                            name: 'host',
                                            fieldLabel: 'Disk Channel',
                                            displayField: 'shortname',
                                            queryMode: 'local',
                                            store: 'ScsiHost',
                                            valueField: 'dev',
                                            databind: {
                                                autoload: true,
                                                model: 'scsihost'
                                            },
                                            anchor: '100%'
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'rescan',
                                            text: 'Rescan ...',
                                            listeners: {
                                                click: {
                                                    fn: me.onRescanClick,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }