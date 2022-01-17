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
                        model: 'virtportal',
                        bindform: 'newvirtentry'
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
                            ftype: 'grouping',
                            enableGroupingMenu: false,
                            enableNoGroups: false
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
                            itemId: 'gvirtportal',
                            bodyCls: 'x-border-layout-ct',
                            databind: {
                                autoload: true,
                                model: 'gvirtportal'
                            },
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
                                            name: 'enabled',
                                            fieldLabel: 'Virt Portal',
                                            boxLabel: 'Enabled',
                                            uncheckedValue: 0,
                                            listeners: {
                                                change: {
                                                    fn: me.onCheckboxfieldChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'ipfield',
                                            itemId: 'portalip',
                                            name: 'portalip',
                                            fieldLabel: 'Portal IP'
                                        },
                                        {
                                            xtype: 'netmaskfield',
                                            itemId: 'portalmask',
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
                                            itemId: 'update',
                                            text: 'Save'
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'refresh',
                                            text: 'Refresh'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'form',
                            border: 0,
                            itemId: 'newvirtentry',
                            bodyCls: 'x-border-layout-ct',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    padding: 5,
                                    collapsed: false,
                                    collapsible: true,
                                    title: 'Setting',
                                    items: [
                                        {
                                            xtype: 'targetlistfield',
                                            databind: {
                                                autoload: true,
                                                model: 'targetlist'
                                            },
                                            name: 'targetname',
                                            value: 'default',
                                            fieldLabel: 'TargetName',
                                            displayField: 'shortname',
                                            valueField: 'targetname'
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