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
                    store: 'VirtPortal',
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
                                    text: 'Delete',
                                    listeners: {
                                        click: {
                                            fn: me.onDeleteClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'refresh',
                                    text: 'Refresh',
                                    listeners: {
                                        click: {
                                            fn: me.onRefreshClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    listeners: {
                        selectionchange: {
                            fn: me.onGridpanelSelectionChange,
                            scope: me
                        }
                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            hidden: true,
                            dataIndex: 'targetid',
                            text: 'Targetid'
                        },
                        {
                            xtype: 'gridcolumn',
                            hidden: true,
                            dataIndex: 'targetname',
                            text: 'Targetname'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'includeip',
                            text: 'Includeip'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'excludesource',
                            text: 'Excludesource'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'count',
                            text: 'Count'
                        }
                    ],
                    features: [
                        {
                            ftype: 'grouping'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    minWidth: 280,
                    width: 150,
                    autoScroll: true,
                    region: 'west',
                    split: true,
                    items: [
                        {
                            xtype: 'fieldset',
                            padding: 5,
                            collapsed: false,
                            collapsible: true,
                            title: 'Global Setting',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: 'Virt Portal',
                                    boxLabel: 'Enabled'
                                },
                                {
                                    xtype: 'ipfield',
                                    name: 'portalip',
                                    fieldLabel: 'Portal IP'
                                },
                                {
                                    xtype: 'netmaskfield',
                                    name: 'portalmask',
                                    fieldLabel: 'Portal Mask'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'maxcount',
                                    fieldLabel: 'Max Count',
                                    blankText: 'default'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Save'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            padding: 5,
                            collapsed: false,
                            collapsible: true,
                            title: 'Setting',
                            items: [
                                {
                                    xtype: 'targetlistfield',
                                    name: 'targetname',
                                    fieldLabel: 'TargetName'
                                },
                                {
                                    xtype: 'ipfield',
                                    name: 'includeip',
                                    fieldLabel: 'Include IP'
                                },
                                {
                                    xtype: 'ipfield',
                                    name: 'excludesource',
                                    fieldLabel: 'Exclude Client'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'add',
                                    margin: 5,
                                    minWidth: 80,
                                    autoWidth: true,
                                    text: 'Add New ...',
                                    formBind: true,
                                    listeners: {
                                        click: {
                                            fn: me.onAddClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }