function(eventName, draggable, event) {
    var elem = draggable.element;
    if (elem.className.indexOf("thetisbox_resize_handle") < 0) {
      return;
    }
    if (is_MS || is_Opera) {
      var id = elem.id.split("-")[1];
      var base = _z("thetisBoxBase-"+id);
      var box = _z("divThetisBox-"+id);
      var content = _z("thetisBoxContent-"+id);
      if (!content) {
        content = _z("thetisBoxTree-"+id);
      }
      var deltaWidth = base.offsetWidth - content.offsetWidth;
      if (deltaWidth < 0) {
        deltaWidth = 0;
      }
      var deltaHeight = base.offsetHeight - content.offsetHeight;
      if (deltaHeight < 0) {
        deltaHeight = 0;
      }
      var clientRegion = ThetisBox.getClientRegion();
      var pos = getPos(box);
      var bodyScroll = ThetisBox.getBodyScroll();

      draggable.options.snap = function(x, y) {
        return ThetisBox.onResizeHandleDragged(x, y, elem, base, box, content, deltaWidth, deltaHeight, clientRegion, pos, bodyScroll);
      };
    }
  }