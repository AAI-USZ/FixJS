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
  for (i = 0; i < this.disableClass.length; i++) {
    var buttons = gj(parent).find('a.'+this.disableClass[i])[0];
    for (k = 0; k < buttons.length; k++) {
      gj(buttons[k]).addClass("DisableButton");
      buttons[k].href = "javascript:void(0);";
      buttons[k].onclick = "return false;";
    }
  }
}