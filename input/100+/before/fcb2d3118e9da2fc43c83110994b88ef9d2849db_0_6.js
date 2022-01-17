function loadUserData()
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
      })
      
        
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
        
    },

    failure : function(r, o) {
      //viewport.getEl().unmask();
    }
  });
}