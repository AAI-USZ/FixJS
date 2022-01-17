function(componentId, parentId, titleId,
    inputId) {
  var me = eXo.wiki.UIFieldEditableForm;
  me.parentComponent = document.getElementById(parentId);
  me.component = gj(me.parentComponent).find('#'+ componentId)[0];
  var titleControl = gj(me.parentComponent).find('#'+ titleId)[0];
  if (titleControl) {
    me.fieldValue = titleControl.firstChild.data;
  }
  
  me.divTag = gj(me.component).find('div.LinkContainer')[0];
  me.inputControl = gj(me.component).find('#'+inputId)[0];
  me.showInputLink = gj(me.divTag).find('a.ShowInput')[0];
  me.submitLink = gj(me.divTag).find('a.SubmitLink')[0];
  gj(document).click(me.onClick);

  if (titleControl) {
    gj(titleControl).click(me.onClickToChangeTitle);
  }
  if (me.inputControl) {
    me.inputControl.form.onsubmit = function() {
      return false;
    };
    me.inputControl.focus();
    gj(me.inputControl).keyup(me.pressHandler);
  }
}