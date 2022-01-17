function saveUser()
{
  if (flagValidateUsername != true) {
    validateUserName();
    if ( Ext.getCmp('USR_USERNAME').getValue() == '') {
      Ext.Msg.alert( _('ID_ERROR'), _('ID_MSG_ERROR_USR_USERNAME'));
    } else {
      Ext.Msg.alert( _('ID_ERROR'), Ext.getCmp('usernameReview').html);
    }
    return false;
  }

  if (flagPoliciesPassword != true) {
    if ( Ext.getCmp('USR_NEW_PASS').getValue() == '') {
      Ext.Msg.alert( _('ID_ERROR'), _('ID_PASSWD_REQUIRED'));
    } else {
      Ext.Msg.alert( _('ID_ERROR'), Ext.getCmp('passwordReview').html);
    }
    return false;
  }

  var newPass  = frmDetails.getForm().findField('USR_NEW_PASS').getValue();
  var confPass = frmDetails.getForm().findField('USR_CNF_PASS').getValue();	
  if (confPass === newPass) {
    Ext.getCmp('frmDetails').getForm().submit( {

      url    : 'usersAjax',
      params : {
        action   : 'saveUser',
        USR_UID  : USR_UID,
        USR_CITY : global.IS_UID
      },
      waitMsg : _('ID_SAVING_PROCESS'),
      timeout : 36000,
      success : function(obj, resp) {
        if (!infoMode) { 
          location.href = 'users_List';
        }
        else {
         location.href = '../users/myInfo?type=reload';
        }

      },
      failure : function(obj, resp) {
        if (typeof resp.result  == "undefined")
        {
          Ext.Msg.alert( _('ID_ERROR'),_('ID_SOME_FIELDS_REQUIRED'));
        }
        else{
          if (resp.result.msg){
            var message = resp.result.msg.split(',');
            Ext.Msg.alert( _('ID_WARNING'), '<strong>'+message[0]+'<strong><br/><br/>'+message[1]+'<br/><br/>'+message[2]);
          }
          if (resp.result.fileError) {
            Ext.Msg.alert( _('ID_ERROR'),_('ID_FILE_TOO_BIG'));
          }
          if (resp.result.error) {
            Ext.Msg.alert( _('ID_ERROR'), resp.result.error);
          }
        }

      }
    });
  }
  else
    Ext.Msg.alert( _('ID_ERROR'), _('ID_PASSWORDS_DONT_MATCH'));
}