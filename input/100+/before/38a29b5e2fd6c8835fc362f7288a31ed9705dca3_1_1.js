function(iForm)
{
  oAux = getField('TAS_UID');

  if (oAux)
  {
    switch (iLastTab)
    {
      case 1:
      case '1':
        oTaskData.TAS_TITLE       = getField('TAS_TITLE').value.replace(re, "@amp@");
        oTaskData.TAS_DESCRIPTION = getField('TAS_DESCRIPTION').value.replace(re, "@amp@");
        oTaskData.TAS_START       = (getField('TAS_START').checked ? 'TRUE' : 'FALSE');
        oTaskData.TAS_PRIORITY_VARIABLE = getField('TAS_PRIORITY_VARIABLE').value;
        oTaskData.TAS_DERIVATION_SCREEN_TPL = getField('TAS_DERIVATION_SCREEN_TPL').value;
      break;
      case 2:
      case '2':
        if (getField('TAS_ASSIGN_TYPE][SELF_SERVICE').checked)
        {
          oTaskData.TAS_ASSIGN_TYPE = 'SELF_SERVICE';
        }
        if (getField('TAS_ASSIGN_TYPE][REPORT_TO').checked)
        {
          oTaskData.TAS_ASSIGN_TYPE = 'REPORT_TO';
        }
        if (getField('TAS_ASSIGN_TYPE][BALANCED').checked)
        {
          oTaskData.TAS_ASSIGN_TYPE = 'BALANCED';
        }
        if (getField('TAS_ASSIGN_TYPE][MANUAL').checked)
        {
          oTaskData.TAS_ASSIGN_TYPE = 'MANUAL';
        }
        if (getField('TAS_ASSIGN_TYPE][EVALUATE').checked)
        {
          oTaskData.TAS_ASSIGN_TYPE = 'EVALUATE';
        }
        /* this feature is temporarily disabled
        if (getField('TAS_ASSIGN_TYPE][STATIC_MI').checked)
        {
          oTaskData.TAS_ASSIGN_TYPE = 'STATIC_MI';
        }
        if (getField('TAS_ASSIGN_TYPE][CANCEL_MI').checked)
        {
          oTaskData.TAS_ASSIGN_TYPE = 'CANCEL_MI';
        }*/
        oTaskData.TAS_ASSIGN_VARIABLE = getField('TAS_ASSIGN_VARIABLE').value;
        /* this feature is temporarily disabled
        oTaskData.TAS_MI_INSTANCE_VARIABLE = getField('TAS_MI_INSTANCE_VARIABLE').value;
        oTaskData.TAS_MI_COMPLETE_VARIABLE = getField('TAS_MI_COMPLETE_VARIABLE').value;*/
      break;
      case 3:
      case '3':
        oTaskData.TAS_DURATION     = getField('TAS_DURATION').value;
        oTaskData.TAS_TIMEUNIT     = getField('TAS_TIMEUNIT').value;
        oTaskData.TAS_TYPE_DAY     = getField('TAS_TYPE_DAY').value;
        oTaskData.TAS_CALENDAR     = getField('TAS_CALENDAR').value;
        oTaskData.TAS_TRANSFER_FLY = (getField('TAS_TRANSFER_FLY').checked ? 'TRUE' : 'FALSE');
      break;
      case 4:
      case '4':
      break;
      case 5:
      case '5':
        /*oTaskData.TAS_CAN_CANCEL                    = (getField('TAS_CAN_CANCEL').checked ? 'TRUE' : 'FALSE');
        oTaskData.TAS_CAN_PAUSE                     = (getField('TAS_CAN_PAUSE').checked ? 'TRUE' : 'FALSE');*/
        oTaskData.TAS_TYPE                          = (getField('TAS_TYPE').checked ? 'ADHOC' : 'NORMAL');
        /*oTaskData.TAS_CAN_SEND_MESSAGE              = (getField('TAS_CAN_SEND_MESSAGE').checked ? 'TRUE' : 'FALSE');
        oTaskData.TAS_CAN_UPLOAD                    = (getField('TAS_CAN_UPLOAD').checked ? 'TRUE' : 'FALSE');
        oTaskData.TAS_VIEW_UPLOAD                   = (getField('TAS_VIEW_UPLOAD').checked ? 'TRUE' : 'FALSE');
        oTaskData.TAS_VIEW_ADDITIONAL_DOCUMENTATION = (getField('TAS_VIEW_ADDITIONAL_DOCUMENTATION').checked ? 'TRUE' : 'FALSE');
        oTaskData.TAS_CAN_DELETE_DOCS               = getField('TAS_CAN_DELETE_DOCS').value;*/
      break;
      case 6:
      case '6':
        oTaskData.TAS_DEF_TITLE       = getField('TAS_DEF_TITLE').value;
        oTaskData.TAS_DEF_DESCRIPTION = getField('TAS_DEF_DESCRIPTION').value;
        //oTaskData.TAS_DEF_PROC_CODE   = getField('TAS_DEF_PROC_CODE').value;
        //oTaskData.SEND_EMAIL          = (getField('SEND_EMAIL').checked ? 'TRUE' : 'FALSE');
        //oTaskData.TAS_DEF_MESSAGE     = getField('TAS_DEF_MESSAGE').value;
      break;
      case 7:
      case '7':
        if ( getField('SEND_EMAIL') != null && (typeof (getField('SEND_EMAIL')) != 'undefined' ) ) {
          // validate fields TAS_DEF_SUBJECT_MESSAGE, TAS_DEF_MESSAGE
          if (getField('SEND_EMAIL').checked) {
            if (getField('TAS_DEF_SUBJECT_MESSAGE').value.trim() == '') {
              new leimnud.module.app.alert().make( {
                label : G_STRINGS.ID_SUBJECT_FIELD_REQUIRED
              });
              return false;
            }
            switch ( getField('TAS_DEF_MESSAGE_TYPE').value ) {
              case 'text' :
                if (getField('TAS_DEF_MESSAGE').value.trim() == '' ) {
                  new leimnud.module.app.alert().make( {
                    label : G_STRINGS.ID_MESSAGE_FIELD_REQUIRED
                  });
                  return false;
                }
                break;
              case 'template' :
                if (getField('TAS_DEF_MESSAGE_TEMPLATE').value.trim() == '' ){
                  new leimnud.module.app.alert().make( {
                    label : G_STRINGS.ID_TEMPLATE_FIELD_REQUIRED
                  });
                  return false;
                }
                break;
            }
        }
        if(typeof getField('SEND_EMAIL') != 'undefined' )
          oTaskData.SEND_EMAIL      = getField('SEND_EMAIL').checked ? 'TRUE' : 'FALSE';
        else
          oTaskData.SEND_EMAIL      = 'FALSE';
        oTaskData.TAS_DEF_MESSAGE = getField('TAS_DEF_MESSAGE').value.replace(re, "@amp@");
        oTaskData.TAS_DEF_SUBJECT_MESSAGE  = getField('TAS_DEF_SUBJECT_MESSAGE').value.replace(re, "@amp@");
        oTaskData.TAS_DEF_MESSAGE_TYPE     = getField('TAS_DEF_MESSAGE_TYPE').value;
        oTaskData.TAS_DEF_MESSAGE_TEMPLATE = getField('TAS_DEF_MESSAGE_TEMPLATE').value;
      }
      break;
    }
  }
  else
  {
    oTaskData = {};
  }
  iLastTab = iForm;
  return true;
}