function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    itemId: 'mappinglist',
                    hideCollapseTool: false,
                    overlapHeader: false,
                    preventHeader: false,
                    title: 'Current Setting',
                    titleCollapse: false,
                    store: 'LunMap',
                    databind: {
                        bindform: 'newmap',
                        progress: {
                            create: 'newin'
                        },
                        autoload: true
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
                            dataIndex: 'sourceip',
                            text: 'Sourceip'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'targetid',
                            text: 'Targetid'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'netmask',
                            text: 'Netmask'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'access',
                            text: 'Access'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'destinationip',
                            text: 'Destinationip'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'targetuser',
                            text: 'Targetuser'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return '********';
                            },
                            dataIndex: 'targetpass',
                            text: 'Targetpass'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'initiatoruser',
                            text: 'Initiatoruser'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return '********';
                            },
                            dataIndex: 'initiatorpass',
                            text: 'Initiatorpass'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    minWidth: 290,
                    padding: 5,
                    width: 150,
                    autoScroll: true,
                    region: 'west',
                    split: true,
                    items: [
                        {
                            xtype: 'form',
                            border: 0,
                            itemId: 'glunmap',
                            width: 282,
                            activeItem: 0,
                            layout: {
                                type: 'auto'
                            },
                            bodyBorder: false,
                            bodyCls: 'x-border-layout-ct',
                            databind: {
                                maskxtype: null,
                                model: 'glunmap',
                                autoload: true
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    padding: 5,
                                    collapsed: true,
                                    collapsible: true,
                                    title: 'Global Setting',
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            name: 'enabled',
                                            fieldLabel: 'LUN Map',
                                            boxLabel: 'Enabled'
                                        },
                                        {
                                            xtype: 'fieldset',
                                            padding: 5,
                                            collapsed: false,
                                            collapsible: true,
                                            title: 'Global CHAP Setting',
                                            items: [
                                                {
                                                    xtype: 'checkboxfield',
                                                    name: 'chapenabled',
                                                    fieldLabel: 'CHAP',
                                                    boxLabel: 'Enabled'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    name: 'gtargetuser',
                                                    fieldLabel: 'Target User',
                                                    maxLength: 12,
                                                    minLength: 12
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    inputType: 'password',
                                                    name: 'gtargetpass',
                                                    fieldLabel: 'Target Pass',
                                                    maxLength: 12,
                                                    minLength: 12
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'update',
                                            text: 'Save',
                                            formBind: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'form',
                            border: 0,
                            itemId: 'newmap',
                            width: 278,
                            bodyCls: 'x-border-layout-ct',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'New Mapping',
                                    items: [
                                        {
                                            xtype: 'ipfield',
                                            name: 'sourceip'
                                        },
                                        {
                                            xtype: 'netmaskfield',
                                            name: 'netmask'
                                        },
                                        {
                                            xtype: 'targetlistfield',
                                            name: 'targetid'
                                        },
                                        {
                                            xtype: 'combobox',
                                            hidden: false,
                                            name: 'access',
                                            value: [
                                                'RW'
                                            ],
                                            fieldLabel: 'Access',
                                            allowBlank: false,
                                            queryMode: 'local',
                                            store: 'Access',
                                            valueField: 'value'
                                        },
                                        {
                                            xtype: 'fieldset',
                                            padding: 5,
                                            width: 268,
                                            collapsed: true,
                                            collapsible: true,
                                            title: 'Mapping CHAP Setting',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    name: 'targetuser',
                                                    fieldLabel: 'Target User'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    inputType: 'password',
                                                    name: 'targetpass',
                                                    fieldLabel: 'Target Pass'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    name: 'initiatoruser',
                                                    fieldLabel: 'Initiator User'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    inputType: 'password',
                                                    name: 'initiatorpass',
                                                    fieldLabel: 'Initiator Pass'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'add',
                                            margin: 5,
                                            minWidth: 80,
                                            autoWidth: true,
                                            text: 'Add New ...',
                                            formBind: true
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'update',
                                            text: 'Update',
                                            formBind: true
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