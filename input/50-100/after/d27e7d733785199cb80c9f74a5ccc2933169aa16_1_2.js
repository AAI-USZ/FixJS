function isValidDatatype(cssClass, changeDatamodeSelect){
    if(!Editor.extractDataType(cssClass, changeDatamodeSelect)){
      ME.dialog.notice(['Ok'], _('noticeMissingDatamode'))
        .dialog('open');
    } else {
      return true;
    }
  }