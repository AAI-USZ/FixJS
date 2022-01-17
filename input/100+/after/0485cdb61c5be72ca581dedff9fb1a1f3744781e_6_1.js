function () {
        var me = this;
        var isNew = this.isNewUser();
        var photoUrl;
        var userGroups = [];
        var displayNameValue = 'Display Name';
        if (me.userFields) {
            photoUrl = me.hasPhoto ? 'data/user/photo?key=' + me.userFields.key : 'resources/images/icons/256x256/dummy-user.png';
            userGroups = me.userFields.groups;
            displayNameValue = me.userFields.displayName;

            this.preProcessAddresses(me.userFields);
        }
        me.headerData = {
            displayName: displayNameValue,
            userstoreName: me.userstore,
            qUserName: me.qUserName,
            isNewUser: isNew,
            edited: false
        };

        me.tbar = {
            xtype: 'userWizardToolbar',
            isNewUser: isNew
        };
        me.items = [
            {
                width: 121,
                padding: 5,
                items: [
                    {
                        xtype: 'photoUploadButton',
                        width: 111,
                        height: 111,
                        style: {
                            position: 'fixed',
                            top: '96px'
                        },
                        photoUrl: photoUrl,
                        title: "User",
                        progressBarHeight: 6,
                        listeners: {
                            mouseenter: function () {
                                var imageToolTip = me.down('#imageToolTip');
                                imageToolTip.show();
                            },
                            mouseleave: function () {
                                var imageToolTip = me.down('#imageToolTip');
                                imageToolTip.hide();
                            }
                        }
                    },
                    {
                        styleHtmlContent: true,
                        height: 50,
                        border: 0,
                        itemId: 'imageToolTip',
                        cls: 'admin-image-upload-button-image-tip',
                        html: '<div class="x-tip x-tip-default x-layer" role="tooltip">' +
                              '<div class="x-tip-anchor x-tip-anchor-top"></div>' +
                              '<div class="x-tip-body  x-tip-body-default x-tip-body-default">' +
                              'Click to upload photo</div></div>',
                        listeners: {
                            afterrender: function (cmp) {
                                Ext.Function.defer(function () {
                                    cmp.hide();
                                }, 10000);
                            }
                        }
                    }
                ]
            },
            {
                columnWidth: 1,
                padding: '10 10 10 0',
                defaults: {
                    border: false
                },
                items: [
                    {
                        xtype: 'container',
                        itemId: 'wizardHeader',
                        styleHtmlContent: true,
                        autoHeight: true,
                        cls: 'admin-wizard-header-container',
                        listeners: {
                            afterrender: {
                                fn: function () {
                                    var me = this;
                                    me.getEl().addListener('click', function (event, target, eOpts) {
                                        me.toggleDisplayNameField(event, target);
                                    });
                                },
                                scope: this
                            }
                        },
                        tpl: new Ext.XTemplate(Templates.account.userWizardHeader),
                        data: me.headerData
                    },
                    {
                        xtype: 'wizardPanel',
                        showControls: true,
                        isNew: isNew,
                        items: [
                            {
                                stepTitle: "Profile",
                                itemId: "profilePanel",
                                xtype: 'editUserFormPanel',
                                userFields: me.userFields,
                                enableToolbar: false
                            },
                            {
                                stepTitle: "User",
                                itemId: "userPanel",
                                xtype: 'editUserFormPanel',
                                userFields: me.userFields,
                                includedFields: ['username', 'email', 'password', 'repeatPassword', 'photo',
                                    'country', 'locale', 'timezone', 'globalPosition'],
                                enableToolbar: false
                            },
                            {
                                stepTitle: "Places",
                                itemId: 'placesPanel',
                                xtype: 'editUserFormPanel',
                                includedFields: ['address'],
                                userFields: me.userFields,
                                enableToolbar: false
                            },
                            {
                                stepTitle: "Memberships",
                                groups: userGroups,
                                xtype: 'wizardStepMembershipPanel',
                                listeners: {
                                    afterrender: {
                                        fn: function () {
                                            var membershipPanel = this.down('wizardStepMembershipPanel');
                                            this.getWizardPanel().addData(membershipPanel.getData());
                                        },
                                        scope: this
                                    }
                                }
                            },
                            {
                                stepTitle: 'Summary',
                                dataType: 'user',
                                xtype: 'summaryTreePanel'
                            }
                        ]
                    }
                ]
            }
        ];

        this.callParent(arguments);

        var uploader = this.down('photoUploadButton');
        uploader.on('fileuploaded', me.photoUploaded, me);


        // Make wizard navigation sticky
        me.on('afterrender', function (userWizard) {
            this.addStickyNavigation(userWizard);
            //Render all user forms
            if (me.userFields && me.userFields.userStore) {
                me.renderUserForms(me.userFields.userStore);
            } else {
                me.renderUserForms(me.userstore);
            }
            me.removeEmptySteps(userWizard.getWizardPanel());
            // Set active item to first one. D-02010 bug workaround
            me.getWizardPanel().getLayout().setActiveItem(0);
        });
    }