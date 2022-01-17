function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    cls: 'whitebg',
                    height: 80,
                    id: 'menuarea',
                    padding: '0px 50px ',
                    layout: {
                        align: 'stretch',
                        padding: '0px 50px ',
                        type: 'vbox'
                    },
                    floatable: false,
                    region: 'north',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            padding: 5,
                            layout: {
                                type: 'table'
                            },
                            fieldLabel: 'Label',
                            hideLabel: true,
                            flex: 1,
                            margins: 5,
                            items: [
                                {
                                    xtype: 'combobox',
                                    itemId: 'testunitselector',
                                    width: 337,
                                    fieldLabel: 'Load Unit',
                                    queryMode: 'local',
                                    valueField: 'text',
                                    databind: {
                                        autoload: true,
                                        model: 'testunit',
                                        mid: 'test.testunit'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'serverip',
                                    fieldLabel: 'serverip',
                                    labelAlign: 'right'
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'unitconfig',
                                    fieldLabel: 'other config',
                                    labelAlign: 'right'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            padding: 5,
                            layout: {
                                type: 'table'
                            },
                            fieldLabel: 'Label',
                            hideLabel: true,
                            flex: 1,
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'multiinstance',
                                    name: 'multiinstance',
                                    fieldLabel: 'Multi Instance',
                                    boxLabel: 'Enable'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'loadoneunit',
                                    text: 'Load This Unit'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'loadtest',
                                    text: 'Load All Units'
                                },
                                {
                                    xtype: 'button',
                                    id: 'show_unlocalized',
                                    text: 'show unlocalized'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    floating: false,
                    id: 'content',
                    padding: '20px 20px 20px 100px',
                    activeItem: 0,
                    layout: {
                        type: 'card'
                    },
                    floatable: false,
                    region: 'center',
                    items: [
                        {
                            xtype: 'tabpanel',
                            id: 'testpanel',
                            closable: false,
                            activeTab: 0
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }