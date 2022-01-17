function isValidDatatype(cssClass, changeDatamodeSelect){
    if(!Editor.extractDataType(cssClass, changeDatamodeSelect)){
      ME.dialog.notice(['Ok'],'Datamode not found. Please specify a valid datamode')
        .dialog('open');
    } else {
      return true;
    }
  }