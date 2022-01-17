function(evt) {
  var me = eXo.wiki.UIFieldEditableForm;
  var isChange = me.fieldValue != me.inputControl.value.trim();
  if (isChange == true) {
    if (me.submitLink || me.submitLink.onclick)
      me.submitLink.onclick();
  } else {
    var hideInputLink = gj(me.divTag).find('a.HideInput')[0];
    hideInputLink.onclick();
  }
}