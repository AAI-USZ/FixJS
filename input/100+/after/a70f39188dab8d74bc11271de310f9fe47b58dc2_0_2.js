function() {
  Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
  Ext.QuickTips.init();

  box = new Ext.BoxComponent({
    width          : 100,
    height         : 80,
    fieldLabel     : '&nbsp',
    labelSeparator : '&nbsp',
    autoEl         : {
      tag   : 'img',
      src   : 'users_ViewPhotoGrid?h=' + Math.random() +'&pUID=' + USR_UID + '',
      align : 'left'
    }

  });

  if (MODE == 'edit' || MODE == '')
    flagPoliciesPassword = true;

  //EDIT MODE
  if (USR_UID != '') {
    allowBlackStatus = true;

    box.setVisible(true);
    box.enable();

    // INFO MODE
    if (infoMode) {
      displayPreferences = 'display:block;';
      loadUserView();
      readMode = true;
      box.setVisible(false);
      box.disable();

    }
    else
    {
      displayPreferences = 'display:none;';
      loadUserData();
      readMode = false;
      canEdit  = false;
    }

  }
  else {
      allowBlackStatus=false;
      box.setVisible(false);
      box.disable();
      displayPreferences = 'display:none;';
      readMode           = false;
      canEdit            = false;
  }


  profileFields = new Ext.form.FieldSet({
    title : _('ID_PROFILE'),
    items : [
    box,
    {
        xtype      : 'fileuploadfield',
        id         : 'USR_PHOTO',
        emptyText  : _('ID_PLEASE_SELECT_PHOTO'),
        fieldLabel : _('ID_PHOTO'),
        name       : 'USR_PHOTO',
        buttonText : '',
        width      : 260,
        buttonCfg  : {
          iconCls : 'upload-icon'
        }

      },{
        xtype      : 'label',
        id         : 'lblMaxFileSize',
        fieldLabel : _('ID_MAX_FILE_SIZE'),
        text       : MAX_FILES_SIZE,
        width      : 400

      }
/*
      ,{
        xtype: 'fileuploadfield',
        id: 'USR_RESUME',
        emptyText: _('ID_PLEASE_SELECT_FILE'),
        fieldLabel: _('ID_RESUME'),
        name: 'USR_RESUME',
        buttonText: '',
        width: 260,
        buttonCfg:{
          iconCls: 'upload-icon'
        }
      }
*/

    ]
  });
  storeCountry = new Ext.data.Store( {
        proxy : new Ext.data.HttpProxy( {
          url    : 'usersAjax',
          method : 'POST'
        }),
        reader : new Ext.data.JsonReader( {
          fields : [ {
            name : 'IC_UID'
          }, {
            name : 'IC_NAME'
          } ]
        })
  });
  comboCountry = new Ext.form.ComboBox({
      fieldLabel    : _('ID_COUNTRY'),
      hiddenName    : 'USR_COUNTRY',
      id            : 'USR_COUNTRY',
      store         : storeCountry,
      valueField    : 'IC_UID',
      displayField  : 'IC_NAME',
      triggerAction : 'all',
      emptyText     : _('ID_SELECT'),
      selectOnFocus : true,
      width         : 180,
      autocomplete  : true,
      typeAhead     : true,
      mode          : 'local',
      listeners : {
        select : function(combo,record,index){
          global.IC_UID = this.getValue();
          comboRegion.store.removeAll();
          comboLocation.store.removeAll();
          comboRegion.clearValue();
          storeRegion.load({
              params : {
                  action : 'stateList',
                  IC_UID : global.IC_UID
              }
          });
          comboLocation.setValue('');
          comboRegion.store.on('load',function(store) {
            comboRegion.setValue('');
          });
        }
      }
    });
  storeCountry.load({
    params : {"action" : "countryList"}
  });

  storeRegion  = new Ext.data.Store( {
    proxy : new Ext.data.HttpProxy( {
      url    : 'usersAjax',
      method : 'POST'
    }),
    reader : new Ext.data.JsonReader( {
      fields : [ {
        name : 'IS_UID'
      }, {
        name : 'IS_NAME'
      } ]
    })
  });
  comboRegion  = new Ext.form.ComboBox({
    fieldLabel    : _('ID_STATE_REGION'),
    hiddenName    : 'USR_REGION',
    id            : 'USR_REGION',
    store         : storeRegion,
    valueField    : 'IS_UID',
    displayField  : 'IS_NAME',
    triggerAction : 'all',
    emptyText     : _('ID_SELECT'),
    selectOnFocus : true,
    width         : 180,
    autocomplete  : true,
    typeAhead     : true,
    mode          : 'local',
    listeners : {
      select : function(combo, record, index) {
        global.IS_UID = this.getValue();
        comboLocation.enable();
        comboLocation.clearValue();
        storelocation.load({
          params : {
            action : 'locationList',
            IC_UID : global.IC_UID,
            IS_UID : global.IS_UID
          }
        });
        comboLocation.store.on('load', function(store) {
          comboLocation.setValue('');
        });
      }
    }
  });

  storelocation = new Ext.data.Store( {
    proxy : new Ext.data.HttpProxy( {
      url : 'usersAjax',
      method : 'POST'
    }),
    reader : new Ext.data.JsonReader( {
      fields : [ {
        name : 'IL_UID'
      }, {
        name : 'IL_NAME'
      } ]
    })
  });
  comboLocation = new Ext.form.ComboBox({
    fieldLabel    : _('ID_LOCATION'),
    hiddenName    : 'USR_LOCATION',
    id            : 'USR_LOCATION',
    store         : storelocation,
    valueField    : 'IL_UID',
    displayField  : 'IL_NAME',
    triggerAction : 'all',
    emptyText     : TRANSLATIONS.ID_SELECT,
    width         : 180,
    autocomplete  : true,
    typeAhead     : true,
    mode          : 'local'

  });

  comboReplacedBy = new Ext.form.ComboBox({
    fieldLabel    : _('ID_REPLACED_BY'),
    hiddenName    : 'USR_REPLACED_BY',
    id            : 'USR_REPLACED_BY',
    store         : new Ext.data.Store( {
      proxy : new Ext.data.HttpProxy( {
        url : 'usersAjax',
        method : 'POST'
      }),
      baseParams : {action : 'usersList'},
      reader     : new Ext.data.JsonReader( {
        fields : [ {
          name : 'USR_UID'
        }, {
          name : 'USER_FULLNAME'
        } ]
      }),
      autoLoad:true
    }),
    valueField    : 'USR_UID',
    displayField  : 'USER_FULLNAME',
    emptyText     : TRANSLATIONS.ID_SELECT,
    width         : 180,
    selectOnFocus : true,
    editable      : false,
    triggerAction: 'all',
    mode: 'local'

  });


  dateField = new Ext.form.DateField({
    id         : 'USR_DUE_DATE',
    fieldLabel : _('ID_EXPIRATION_DATE'),
    format     : 'Y-m-d',
    editable   : false,
    readOnly   : readMode,
    width      : 120,
    value      : (new Date().add(Date.YEAR, 1)).format('Y-m-d')
  });


  comboCalendar = new Ext.form.ComboBox({
    fieldLabel : _('ID_CALENDAR'),
    hiddenName : 'USR_CALENDAR',
    id         : 'USR_CALENDAR',
    readOnly   : readMode,
    store      : new Ext.data.Store( {
      proxy : new Ext.data.HttpProxy( {
        url    : 'usersAjax',
        method : 'POST'
      }),
      baseParams : {action : 'availableCalendars'},
      reader     : new Ext.data.JsonReader( {
        fields : [ {
          name : 'CALENDAR_UID'
        }, {
          name : 'CALENDAR_NAME'
        } ]
      }),
      autoLoad : true
    }),

    valueField    : 'CALENDAR_UID',
    displayField  : 'CALENDAR_NAME',
    emptyText     : TRANSLATIONS.ID_SELECT,
    width         : 180,
    selectOnFocus : true,
    editable      : false,
    allowBlank    : false,
    triggerAction : 'all',
    mode          : 'local'

  });
  comboCalendar.store.on('load', function(store) {
    comboCalendar.setValue(store.getAt(0).get('CALENDAR_UID'));
  });

  var status = new Ext.data.SimpleStore({
    fields : ['USR_STATUS', 'status'],
    data   : [['ACTIVE', 'ACTIVE'], ['INACTIVE', 'INACTIVE'], ['VACATION', 'ON VACATION']]
  });
  comboStatus = new Ext.form.ComboBox({
    xtype         : 'combo',
    name          : 'status',
    fieldLabel    : _('ID_STATUS'),
    hiddenName    : 'USR_STATUS',
    id            : 'USR_STATUS',
    mode          : 'local',
    store         : status,
    displayField  : 'status',
    valueField    : 'USR_STATUS',
    width         : 120,
    typeAhead     : true,
    triggerAction : 'all',
    editable      : false,
    value         : 'ACTIVE',
    readOnly      : readMode
  });


  comboRole = new Ext.form.ComboBox({
    fieldLabel    : _('ID_ROLE'),
    hiddenName    : 'USR_ROLE',
    id            : 'USR_ROLE',
    readOnly      : readMode,
    store         : new Ext.data.Store( {
      proxy : new Ext.data.HttpProxy( {
        url    : 'usersAjax',
        method : 'POST'
      }),
      baseParams : {action : 'rolesList'},
      reader     : new Ext.data.JsonReader( {
        fields : [ {
          name : 'ROL_UID'
        }, {
          name : 'ROL_CODE'
        } ]
      }),
      autoLoad : true
    }),

    valueField    : 'ROL_UID',
    displayField  : 'ROL_CODE',
    emptyText     : TRANSLATIONS.ID_SELECT,
    width         : 260,
    selectOnFocus : true,
    editable      : false,
    allowBlank    : false,
    triggerAction : 'all',
    mode          : 'local'


  });
  comboRole.store.on('load',function(store) {
      comboRole.setValue(store.getAt(0).get('ROL_UID'));
  })

  informationFields = new Ext.form.FieldSet({
    title : _('ID_PERSONAL_INFORMATION'),
    items : [
      {
        id         : 'USR_FIRSTNAME',
        fieldLabel : _('ID_FIRSTNAME'),
        xtype      : 'textfield',
        width      : 260,
        allowBlank : false
      },
      {
        id         : 'USR_LASTNAME',
        fieldLabel : _('ID_LASTNAME'),
        xtype      : 'textfield',
        width      : 260,
        allowBlank : false
      },
      {
        id         : 'USR_USERNAME',
        fieldLabel : _('ID_USER_ID'),
        xtype      : 'textfield',
        width      : 260,
        allowBlank : false,
        listeners: {
          blur : function(ob)
          {
            // trim
            this.value = this.getValue().replace(/^\s+|\s+$/g,"");
            document.getElementById('USR_USERNAME').value = this.getValue().replace(/^\s+|\s+$/g,"");

            Ext.getCmp('saveB').disable();
            Ext.getCmp('cancelB').disable();

            var spanAjax  = '<span style="font: 9px tahoma,arial,helvetica,sans-serif;">';
            var imageAjax = '<img width="13" height="13" border="0" src="/images/ajax-loader.gif">';
            var labelAjax = _('ID_USERNAME_TESTING');

            Ext.getCmp('usernameReview').setText(spanAjax + imageAjax + labelAjax + '</span>', false);
            Ext.getCmp('usernameReview').setVisible(true);

            usernameText = this.getValue();

            validateUserName();

            Ext.getCmp('usernameReview').setVisible(true);
          }
        }
      },
      {
        xtype: 'label',
        fieldLabel: ' ',
        id:'usernameReview',
        width: 300,
        labelSeparator: ''
      },
      {
        id         : 'USR_EMAIL',
        fieldLabel : _('ID_EMAIL'),
        vtype      : 'email',
        xtype      : 'textfield',
        width      : 260,
        allowBlank : false
      },
      {
        xtype          : 'textarea',
        name           : 'USR_ADDRESS',
        fieldLabel     : _('ID_ADDRESS'),
        labelSeparator : '',
        height         : 50,
        width          : 260
      },
      {
        id         : 'USR_ZIP_CODE',
        fieldLabel : _('ID_ZIP_CODE'),
        xtype      : 'textfield',
        width      : 260
      },
      comboCountry,
      comboRegion,
      comboLocation,
      {
        id         : 'USR_PHONE',
        fieldLabel : _('ID_PHONE'),
        xtype      : 'textfield',
        width      : 260
      },
      {
        id         : 'USR_POSITION',
        fieldLabel : _('ID_POSITION'),
        xtype      : 'textfield',
        width      : 260
      },
      comboReplacedBy,
      dateField,
      comboCalendar,
      comboStatus,
      comboRole

      ]
  });
  passwordFields = new Ext.form.FieldSet({
    title : _('ID_CHANGE_PASSWORD'),
    items : [
      {
        id         : 'USR_NEW_PASS',
        fieldLabel : _('ID_NEW_PASSWORD'),
        xtype      : 'textfield',
        inputType  : 'password',
        width      : 260,
        allowBlank : allowBlackStatus,
        listeners: {
          blur : function(ob)
          {
            Ext.getCmp('saveB').disable();
            Ext.getCmp('cancelB').disable();
            var spanAjax = '<span style="font: 9px tahoma,arial,helvetica,sans-serif;">';
            var imageAjax = '<img width="13" height="13" border="0" src="/images/ajax-loader.gif">';
            var labelAjax = _('ID_PASSWORD_TESTING');

            Ext.getCmp('passwordReview').setText(spanAjax + imageAjax + labelAjax + '</span>', false);
            Ext.getCmp('passwordReview').setVisible(true);

            var passwordText = this.getValue();

            Ext.Ajax.request({
              url    : 'usersAjax',
              method:'POST',
              params : {
                'action'        : 'testPassword',
                'PASSWORD_TEXT' : passwordText
              },
              success: function(r,o){
                var resp = Ext.util.JSON.decode(r.responseText);

                if (resp.STATUS) {
                  flagPoliciesPassword = true;
                } else {
                  flagPoliciesPassword = false;
                }

                Ext.getCmp('passwordReview').setText(resp.DESCRIPTION, false);
                Ext.getCmp('saveB').enable();
                Ext.getCmp('cancelB').enable();
              },
              failure: function () {
                Ext.MessageBox.show({
                  title: 'Error',
                  msg: 'Failed to store data',
                  buttons: Ext.MessageBox.OK,
                  animEl: 'mb9',
                  icon: Ext.MessageBox.ERROR
                });
                Ext.getCmp('saveB').enable();
                Ext.getCmp('cancelB').enable();
              }
            });

            Ext.getCmp('passwordReview').setVisible(true);

            if (Ext.getCmp('USR_CNF_PASS').getValue() != '') {
              userExecuteEvent(document.getElementById('USR_CNF_PASS'), 'blur');
            }

          }
        }
      },
      {
        xtype: 'label',
        fieldLabel: ' ',
        id:'passwordReview',
        width: 300,
        labelSeparator: ''
      },
      {
        id         : 'USR_CNF_PASS',
        fieldLabel : _('ID_CONFIRM_PASSWORD'),
        xtype      : 'textfield',
        inputType  : 'password',
        width      : 260,
        allowBlank : allowBlackStatus,
        listeners: {
          blur : function(ob)
          {
            var passwordText    = Ext.getCmp('USR_NEW_PASS').getValue();
            var passwordConfirm = this.getValue();

            if (passwordText != passwordConfirm) {
              var spanErrorConfirm  = '<span style="color: red; font: 9px tahoma,arial,helvetica,sans-serif;">';
              var imageErrorConfirm = '<img width="13" height="13" border="0" src="/images/delete.png">';
              var labelErrorConfirm = _('ID_NEW_PASS_SAME_OLD_PASS');

              Ext.getCmp('passwordConfirm').setText(spanErrorConfirm + imageErrorConfirm + labelErrorConfirm + '</span>', false);
              Ext.getCmp('passwordConfirm').setVisible(true);
            } else {
              Ext.getCmp('passwordConfirm').setVisible(false);
            }
          }
        }
      },
      {
        xtype: 'label',
        fieldLabel: ' ',
        id:'passwordConfirm',
        width: 300,
        labelSeparator: ''
      }

    ]
  });

  comboDefaultMainMenuOption = new Ext.form.ComboBox({
    fieldLabel : _('ID_DEFAULT_MAIN_MENU_OPTION'),
    hiddenName : 'PREF_DEFAULT_MENUSELECTED',
    id         : 'PREF_DEFAULT_MENUSELECTED',
    store      : new Ext.data.Store( {
      proxy : new Ext.data.HttpProxy( {
        url : 'usersAjax',
        method : 'POST'
      }),
      baseParams : {action : 'defaultMainMenuOptionList'},
      reader : new Ext.data.JsonReader( {
        fields : [ {
          name : 'id'
        }, {
          name : 'name'
        } ]
      }),
      autoLoad : true
    }),
    valueField    : 'id',
    displayField  : 'name',
    emptyText     : TRANSLATIONS.ID_SELECT,
    width         : 260,
    selectOnFocus : true,
    editable      : false,
    triggerAction : 'all',
    mode          : 'local'
  });
  comboDefaultMainMenuOption.store.on('load',function(store) {
      comboDefaultMainMenuOption.setValue(store.getAt(0).get('id'));
  });
  comboDefaultCasesMenuOption = new Ext.form.ComboBox({
    fieldLabel : _('ID_DEFAULT_CASES_MENU_OPTION'),
    hiddenName : 'PREF_DEFAULT_CASES_MENUSELECTED',
    id         : 'PREF_DEFAULT_CASES_MENUSELECTED',
    store      : new Ext.data.Store( {
      proxy : new Ext.data.HttpProxy( {
        url : 'usersAjax',
        method : 'POST'
      }),
      baseParams : {action : 'defaultCasesMenuOptionList'},
      reader     : new Ext.data.JsonReader( {
        fields : [ {
          name : 'id'
        }, {
          name : 'name'
        } ]
      }),
      autoLoad : true
    }),
    valueField    : 'id',
    displayField  : 'name',
    emptyText     : TRANSLATIONS.ID_SELECT,
    width         : 260,
    selectOnFocus : true,
    editable      : false,
    triggerAction : 'all',
    mode          : 'local'
  });
  comboDefaultCasesMenuOption.store.on('load',function(store) {
      comboDefaultCasesMenuOption.setValue(store.getAt(0).get('id'));
  });

  preferencesFields = new Ext.form.FieldSet({
    title : _('ID_PREFERENCES'),
    // for display or not a preferences FieldSet
    style : displayPreferences,
    items : [{
        xtype : 'hidden',
        name  : 'PREF_DEFAULT_LANG',
        value : ''
      },
      comboDefaultMainMenuOption,
      comboDefaultCasesMenuOption
    ]
  });

  frmDetails = new Ext.FormPanel({
    id            : 'frmDetails',
    labelWidth    : 250,
    labelAlign    :'right',
    autoScroll    : true,
    fileUpload    : true,
    width         : 800,
    bodyStyle     : 'padding:10px',
    waitMsgTarget : true,
    frame         : true,
    defaults : {
      anchor     : '100%',
      allowBlank : false,
      resizable  : true,
      msgTarget  : 'side',
      align      : 'center'
    },
    items : [
      informationFields,
      passwordFields,
      profileFields,
      preferencesFields
    ],
    buttons : [
      {
        text   : _('ID_SAVE'),
        id     : 'saveB',
        handler: saveUser


      },
      {
        text    : _('ID_CANCEL'),
        id      : 'cancelB',
        handler : function(){
          if (!infoMode) {
            location.href = 'users_List';
          }
          else{
            frmDetails.hide();
            frmSumary.show();
          }
          //location.href = 'users_List';
        }
        //hidden:readMode
      }
    ]

  });


  //USERS SUMMARY
  box2 = new Ext.BoxComponent({
    width: 100,
    height: 80,
    fieldLabel     : '&nbsp',
    labelSeparator : '&nbsp',
    autoEl         : {
      tag   : 'img',
      src   : 'users_ViewPhotoGrid?h=' + Math.random() +'&pUID=' + USR_UID + '',
      align : 'left'}
  });
  profileFields2 = new Ext.form.FieldSet({
    title : _('ID_PROFILE'),
    items : [
      box2
    ]
  });
  informationFields2 = new Ext.form.FieldSet({
    title : _('ID_PERSONAL_INFORMATION'),
    items : [
      {
        id         : 'USR_FIRSTNAME2',
        fieldLabel : _('ID_FIRSTNAME'),
        xtype      : 'label',
        width      : 260
      },
      {
        id         : 'USR_LASTNAME2',
        fieldLabel : _('ID_LASTNAME'),
        xtype      : 'label',
        width      : 260
      },
      {
        id         : 'USR_USERNAME2',
        fieldLabel : _('ID_USER_ID'),
        xtype      : 'label',
        width      : 260
      },
      {
        id         : 'USR_EMAIL2',
        fieldLabel : _('ID_EMAIL'),
        xtype      : 'label',
        width      : 260
      },
      {
        xtype      : 'label',
        id         : 'USR_ADDRESS2',
        fieldLabel : _('ID_ADDRESS'),
        width      : 260
      },
      {
        id         : 'USR_ZIP_CODE2',
        fieldLabel : _('ID_ZIP_CODE'),
        xtype      : 'label',
        width      : 260
      },
      {
        id         : 'USR_COUNTRY2',
        fieldLabel : _('ID_COUNTRY'),
        xtype      : 'label',
        width      : 260
      },
      {
        id         : 'USR_CITY2',
        fieldLabel : _('ID_STATE_REGION'),
        xtype      : 'label',
        width      : 260
      },
      {
        id         : 'USR_LOCATION2',
        fieldLabel : _('ID_LOCATION'),
        xtype      : 'label',
        width      : 260
      },
      {
        id         : 'USR_PHONE2',
        fieldLabel : _('ID_PHONE'),
        xtype      : 'label',
        width      : 260
      },
      {
        id         : 'USR_POSITION2',
        fieldLabel : _('ID_POSITION'),
        xtype      : 'label',
        width      : 260
      },
      {
        id         : 'USR_REPLACED_BY2',
        fieldLabel : _('ID_REPLACED_BY'),
        xtype      : 'label',
        width      : 260
      },
      {
        id         : 'USR_DUE_DATE2',
        fieldLabel : _('ID_EXPIRATION_DATE'),
        xtype      : 'label',
        width      : 260
      },
      {
        id         : 'USR_CALENDAR2',
        fieldLabel : _('ID_CALENDAR'),
        xtype      : 'label',
        width      : 260
      },
      {
        id         : 'USR_STATUS2',
        fieldLabel : _('ID_STATUS'),
        xtype      : 'label',
        width      : 260
      },
      {
        id         : 'USR_ROLE2',
        fieldLabel : _('ID_ROLE'),
        xtype      : 'label',
        width      : 260
      }

    ]
  });
  passwordFields2 = new Ext.form.FieldSet({
    title : _('ID_PASSWORD'),
    items : [
      {
        id         : 'USR_PASSWORD2',
        fieldLabel : _('ID_PASSWORD'),
        xtype      : 'label',
        width      : 260,
        text       : '  *******************'
      }
    ]
  });
  preferencesFields2 = new Ext.form.FieldSet({
    title : _('ID_PREFERENCES'),
    // for display or not a preferences FieldSet
    style : displayPreferences,
    items : [
      {
        id         : 'PREF_DEFAULT_MAIN_MENU_OPTION2',
        fieldLabel : _('ID_DEFAULT_MAIN_MENU_OPTION'),
        xtype      : 'label',
        width      : 260
      },
      {
        id         : 'PREF_DEFAULT_CASES_MENUSELECTED2',
        fieldLabel : _('ID_DEFAULT_CASES_MENU_OPTION'),
        xtype      : 'label',
        width      : 260
      }
    ]
  });

  frmSumary = new Ext.FormPanel({
    id            : 'frmSumary',
    labelWidth    : 320,
    labelAlign    : 'right',
    autoScroll    : true,
    fileUpload    : true,
    width         : 800,
    //height:1000,
    bodyStyle     : 'padding:10px',
    waitMsgTarget : true,
    frame         : true,
    items         : [
      box2,
      //profileFields2,
      informationFields2,
      //passwordFields2,
      preferencesFields2
           ],
    buttons : [
      {
        text    : _('ID_EDIT'),
        handler : editUser,
        hidden  : canEdit
      }

    ]

  });

  if (infoMode) {
    document.body.appendChild(defineUserPanel());
    frmSumary.render('users-panel');
  }
  else {
    frmDetails.render(document.body);
  }

  Ext.getCmp('passwordReview').setVisible(false);
  Ext.getCmp('passwordConfirm').setVisible(false);
  Ext.getCmp('usernameReview').setVisible(false);

  var spanAjax  = '<span style="font: 9px tahoma,arial,helvetica,sans-serif;">';
  var imageAjax = '<img width="13" height="13" border="0" src="/images/ajax-loader.gif">';
  var labelAjax = _('ID_PASSWORD_TESTING');

  Ext.getCmp('passwordReview').setText(spanAjax + imageAjax + labelAjax + '</span>', false);

  var labelAjax = _('ID_USERNAME_TESTING');

  Ext.getCmp('usernameReview').setText(spanAjax + imageAjax + labelAjax + '</span>', false);
}