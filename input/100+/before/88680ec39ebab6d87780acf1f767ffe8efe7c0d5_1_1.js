function(componentId, parentId, titleId,
    inputId) {
  var me = eXo.wiki.UIFieldEditableForm;
  me.parentComponent = document.getElementById(parentId);
  me.component = eXo.core.DOMUtil.findDescendantById(me.parentComponent, componentId);
  var titleControl = eXo.core.DOMUtil.findDescendantById(me.parentComponent, titleId);
  if (titleControl) {
    me.fieldValue = titleControl.firstChild.data;
  }
  
  me.divTag = eXo.core.DOMUtil.findFirstChildByClass(me.component, "div", "LinkContainer");
  me.inputControl = eXo.core.DOMUtil.findDescendantById(me.component, inputId);
  me.showInputLink = eXo.core.DOMUtil.findFirstChildByClass(me.divTag, "a", "ShowInput");
  me.submitLink = eXo.core.DOMUtil.findFirstChildByClass(me.divTag, "a", "SubmitLink");
  eXo.core.Browser.eventListener(document, 'click', me.onClick);

  if (titleControl) {   
    eXo.core.Browser.eventListener(titleControl, 'click', me.onClickToChangeTitle);
  }
  if (me.inputControl) {
    me.inputControl.form.onsubmit = function() {
      return false;
    };
    me.inputControl.focus();   
    eXo.core.Browser.eventListener(me.inputControl, 'keyup', me.pressHandler);
  }
}