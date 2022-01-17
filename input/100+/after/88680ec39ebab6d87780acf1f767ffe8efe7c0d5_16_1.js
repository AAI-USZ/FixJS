function(uicomponentId, titleMessage, message,
    submitClass, submitLabel, cancelLabel) {
  
  var me = eXo.wiki.UIConfirmBox;
  var submitAction = document.getElementById(uicomponentId);
  
  me.confirmBox = document.createElement('div');
  gj(me.confirmBox).addClass('ConfirmBox').attr('align', 'center');

  var confirmBar = document.createElement('div');
  gj(confirmBar).addClass('ConfirmBar');

  var confirmTitle = document.createElement('div');
  gj(confirmTitle).addClass('ConfirmTitle');
  confirmTitle.appendChild(document.createTextNode(titleMessage));
  confirmBar.appendChild(confirmTitle);

  var closeButton = document.createElement('a');
  gj(closeButton).addClass('CloseButton').attr("href", "javascript:eXo.wiki.UIConfirmBox.closeConfirm()");
  confirmBar.appendChild(closeButton);
  me.confirmBox.appendChild(confirmBar);

  var container = document.createElement('div');
  var divMessage = document.createElement('div');
  gj(divMessage).addClass('ConfirmMessage')
  divMessage.appendChild(document.createTextNode(message));
  container.appendChild(divMessage);
  if (submitAction && submitLabel) {
    me.createInput(container, submitAction, submitLabel);
  }
  if (cancelLabel) {
    me.createInput(container, null, cancelLabel);
  }
  me.confirmBox.appendChild(container);
  submitAction.appendChild(me.confirmBox);
  this.maskLayer = eXo.core.UIMaskLayer.createMask("UIPortalApplication",
      me.confirmBox, 30);
  return false;
}