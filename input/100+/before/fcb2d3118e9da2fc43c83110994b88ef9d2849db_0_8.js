function loadUserView()
{
  Ext.Ajax.request({
    url    : 'usersAjax',
    params : {
      'action' : 'userData',
      USR_UID  : USR_UID
    },
    waitMsg : _('ID_UPLOADING_PROCESS_FILE'), 
    success : function(r,o){			
      var data = Ext.util.JSON.decode(r.responseText);
      
      Ext.getCmp('frmDetails').getForm().setValues({
        USR_FIRSTNAME : data.user.USR_FIRSTNAME, 
        USR_LASTNAME  : data.user.USR_LASTNAME,
        USR_USERNAME  : data.user.USR_USERNAME,
        USR_EMAIL     : data.user.USR_EMAIL,
        USR_ADDRESS   : data.user.USR_ADDRESS,
        USR_ZIP_CODE  : data.user.USR_ZIP_CODE,
        USR_PHONE     : data.user.USR_PHONE,
        USR_POSITION  : data.user.USR_POSITION,
        USR_DUE_DATE  : data.user.USR_DUE_DATE,
        USR_STATUS    : data.user.USR_STATUS
      });
      Ext.getCmp('USR_FIRSTNAME2').setText(data.user.USR_FIRSTNAME);
      Ext.getCmp('USR_LASTNAME2').setText(data.user.USR_LASTNAME);
      Ext.getCmp('USR_USERNAME2').setText(data.user.USR_USERNAME);
      Ext.getCmp('USR_EMAIL2').setText(data.user.USR_EMAIL);
      Ext.getCmp('USR_ADDRESS2').setText(data.user.USR_ADDRESS);
      Ext.getCmp('USR_ZIP_CODE2').setText(data.user.USR_ZIP_CODE);
      
      Ext.getCmp('USR_COUNTRY2').setText(data.user.USR_COUNTRY_NAME);
      Ext.getCmp('USR_CITY2').setText(data.user.USR_CITY_NAME);
      Ext.getCmp('USR_LOCATION2').setText(data.user.USR_LOCATION_NAME);
      
      Ext.getCmp('USR_PHONE2').setText(data.user.USR_PHONE);
      Ext.getCmp('USR_POSITION2').setText(data.user.USR_POSITION);
      Ext.getCmp('USR_REPLACED_BY2').setText(data.user.REPLACED_NAME);
      Ext.getCmp('USR_DUE_DATE2').setText(data.user.USR_DUE_DATE);
      Ext.getCmp('USR_STATUS2').setText(data.user.USR_STATUS);
      Ext.getCmp('USR_ROLE2').setText(data.user.USR_ROLE);
      
      
      Ext.getCmp('PREF_DEFAULT_MAIN_MENU_OPTION2').setText(data.user.MENUSELECTED_NAME);
      Ext.getCmp('PREF_DEFAULT_CASES_MENUSELECTED2').setText(data.user.CASES_MENUSELECTED_NAME);

      storeCountry.load({
          params : {
            action : 'countryList'
        }
      });

      storeRegion.load({
        params : {
          action : 'stateList',
          IC_UID : data.user.USR_COUNTRY
        }
      });

      storelocation.load({
        params : {
          action : 'locationList',
          IC_UID : data.user.USR_COUNTRY,
          IS_UID : data.user.USR_CITY 
        }  
      });
      comboCountry.store.on('load',function(store) {
        comboCountry.setValue(data.user.USR_COUNTRY);
      });
      global.IC_UID = data.user.USR_COUNTRY;
     
      comboRegion.store.on('load',function(store) {
        comboRegion.setValue(data.user.USR_CITY);
      });
      
      global.IS_UID = data.user.USR_CITY;
      comboLocation.store.on('load',function(store) {
        comboLocation.setValue(data.user.USR_LOCATION);
      });
           
      comboReplacedBy.store.on('load',function(store) {
        comboReplacedBy.setValue(data.user.USR_REPLACED_BY);
      });
      comboRole.store.on('load',function(store) {
        comboRole.setValue(data.user.USR_ROLE);
      });
      comboCalendar.store.on('load',function(store) {
        comboCalendar.setValue(data.user.USR_CALENDAR);
      });
       
      //for preferences on the configurations table
      comboDefaultMainMenuOption.store.on('load',function(store) {
        comboDefaultMainMenuOption.setValue(data.user.PREF_DEFAULT_MENUSELECTED);
      });
      comboDefaultCasesMenuOption.store.on('load',function(store) {
        //comboDefaultCasesMenuOption.setValue('');
        comboDefaultCasesMenuOption.setValue(data.user.PREF_DEFAULT_CASES_MENUSELECTED);
      });
    },
    failure:function(r,o) {
      //viewport.getEl().unmask();
    }
  });

}