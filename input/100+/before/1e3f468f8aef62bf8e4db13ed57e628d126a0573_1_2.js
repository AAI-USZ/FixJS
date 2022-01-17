function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    onactiondone: function(success, action, model, values, controller, dbcfg) {
                        if (success) dbcfg.dbc.up('window').close();
                    },
                    border: 0,
                    padding: 10,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    bodyCls: 'x-border-layout-ct',
                    bodyPadding: 20,
                    databind: {
                        model: 'login'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            itemId: 'logon',
                            width: 300,
                            name: 'logingon',
                            value: 'localhost',
                            fieldLabel: 'Loging on',
                            labelAlign: 'right',
                            margins: '0 0 5 0'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'username',
                            width: 300,
                            name: 'username',
                            readOnly: true,
                            fieldLabel: 'Username',
                            labelAlign: 'right',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            width: 300,
                            inputType: 'password',
                            name: 'password',
                            fieldLabel: 'Old Password',
                            labelAlign: 'right',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'newpassword',
                            width: 300,
                            inputType: 'password',
                            name: 'newpassword',
                            fieldLabel: 'New password',
                            labelAlign: 'right',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var newpass = this.up().down('#newpassword').getValue();
                                if (value != newpass) return false;
                                return true;
                            },
                            width: 300,
                            inputType: 'password',
                            invalidText: 'Re-typing mismatched with new password',
                            name: 'retyping',
                            fieldLabel: 'Re-typing',
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'button',
                            itemId: 'upload',
                            minWidth: 120,
                            iconCls: 'x-btn-tool-login',
                            text: 'Change$',
                            usingaction: 'update',
                            margins: '15 0 20 0',
                            formBind: true
                        }
                    ]
                }
            ],
            listeners: {
                show: {
                    fn: me.onWindowShow,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    }