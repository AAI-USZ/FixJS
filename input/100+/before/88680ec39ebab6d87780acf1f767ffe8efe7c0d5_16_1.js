function(uicomponentId, titleMessage, message,
    submitClass, submitLabel, cancelLabel) {
  
  var me = eXo.wiki.UIConfirmBox;
  var submitAction = document.getElementById(uicomponentId);
  
  me.confirmBox = document.createElement('div');
  eXo.core.DOMUtil.addClass(me.confirmBox, 'ConfirmBox');
  me.confirmBox.setAttribute('align', 'center');

  var confirmBar = document.createElement('div');
  eXo.core.DOMUtil.addClass(confirmBar, 'ConfirmBar');

  var confirmTitle = document.createElement('div');
  eXo.core.DOMUtil.addClass(confirmTitle, 'ConfirmTitle');
  confirmTitle.appendChild(document.createTextNode(titleMessage));
  confirmBar.appendChild(confirmTitle);

  var closeButton = document.createElement('a');
  eXo.core.DOMUtil.addClass(closeButton, 'CloseButton');
  closeButton.setAttribute('href',
      'javascript:eXo.wiki.UIConfirmBox.closeConfirm()');
  confirmBar.appendChild(closeButton);
  me.confirmBox.appendChild(confirmBar);

  var container = document.createElement('div');
  var divMessage = document.createElement('div');
  eXo.core.DOMUtil.addClass(divMessage, 'ConfirmMessage');
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