function() {
  var me = eXo.wiki.UIConfirmBox;
  if (this.maskLayer) {
    eXo.core.UIMaskLayer.removeMask(this.maskLayer);
    this.maskLayer = null;
  }
  if (me.confirmBox) {
    eXo.core.DOMUtil.removeElement(me.confirmBox);
    me.confirmBox = null;
  }
}