function() {
  var me = eXo.wiki.UIConfirmBox;
  var confirmbox = me.confirmBox;

  if (confirmbox && (confirmbox.style.display == "block")) {
    try {
      eXo.core.UIMaskLayer.blockContainer = document
          .getElementById("UIPortalApplication");
      eXo.core.UIMaskLayer.object = confirmbox;
      eXo.core.UIMaskLayer.setPosition();
    } catch (e) {
    }
  }
}