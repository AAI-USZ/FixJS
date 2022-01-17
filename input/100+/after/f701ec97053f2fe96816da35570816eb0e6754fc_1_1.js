function(uicomponentId, titleMessage, message,
    submitClass, submitLabel, cancelLabel) {
  
  var me = eXo.wiki.UIConfirmBox;
  var submitAction = document.getElementById(uicomponentId);
  me.confirmBox = gj('<div/>', {
    'class' : 'ConfirmBox',
    align : 'center'
  }).append(gj('<div/>', {
    'class' : 'ConfirmBar'
  }).append(gj('<div/>', {
    'class' : 'ConfirmTitle',
    text : titleMessage
  }), gj('<a/>', {
    'class' : 'CloseButton',
    href : 'javascript:eXo.wiki.UIConfirmBox.closeConfirm()'
  })));

  var container = gj('<div/>').append(gj('<div/>', {
    'class' : 'ConfirmMessage',
    text : message
  }))

  if (submitAction && submitLabel) {
    me.createInput(container, submitAction, submitLabel);
  }
  if (cancelLabel) {
    me.createInput(container, null, cancelLabel);
  }
  gj(submitAction).append(gj(me.confirmBox).append(container));
  this.maskLayer = eXo.core.UIMaskLayer.createMask("UIPortalApplication",
      me.confirmBox[0], 30);
  return false;
}