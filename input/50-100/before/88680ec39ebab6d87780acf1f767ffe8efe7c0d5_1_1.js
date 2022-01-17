function(evt) {
  var me = eXo.wiki.UIFieldEditableForm;
  var evt = evt || window.event;
  var target = evt.target || evt.srcElement;
  if (me.inputControl && target != me.inputControl && target != me.component) {
    var hideInputLink = eXo.core.DOMUtil.findFirstDescendantByClass(
        me.divTag, "a", "HideInput");
    hideInputLink.onclick();
  }
}