function(evt) {
  var me = eXo.wiki.UIFieldEditableForm;
  var isChange = me.fieldValue != me.inputControl.value.trim();
  if (isChange == true) {
    if (me.submitLink || me.submitLink.onclick)
      me.submitLink.onclick();
  } else {
    var hideInputLink = eXo.core.DOMUtil.findFirstDescendantByClass(
        me.divTag, "a", "HideInput");
    hideInputLink.onclick();
  }
}