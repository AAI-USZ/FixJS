function(parent, action) {
  var isNeedToSynchronize = false;
  for (i = 0; i < this.actionToSynchronizeSave.length; i++) {
    if (action == this.actionToSynchronizeSave[i]) {
      isNeedToSynchronize = true;
      break;
    }
  }
  
  if (isNeedToSynchronize == false) {
    return;
  }
  
  var DOMUtil = eXo.core.DOMUtil;
  for (i = 0; i < this.disableClass.length; i++) {
    var buttons = DOMUtil.findDescendantsByClass(parent, "a", this.disableClass[i]);
    for (k = 0; k < buttons.length; k++) {
      DOMUtil.addClass(buttons[k], "DisableButton");
      buttons[k].href = "javascript:void(0);";
      buttons[k].onclick = "return false;";
    }
  }
}