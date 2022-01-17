function(el) {
  var box, doc = goog.dom.getOwnerDocument(el);
  var positionStyle = goog.style.getStyle_(el, 'position');
  // TODO(gboyer): Update the jsdoc in a way that doesn't break the universe.
  goog.asserts.assertObject(el, 'Parameter is required');

  // NOTE(eae): Gecko pre 1.9 normally use getBoxObjectFor to calculate the
  // position. When invoked for an element with position absolute and a negative
  // position though it can be off by one. Therefor the recursive implementation
  // is used in those (relatively rare) cases.
  var BUGGY_GECKO_BOX_OBJECT = goog.userAgent.GECKO && doc.getBoxObjectFor &&
      !el.getBoundingClientRect && positionStyle == 'absolute' &&
      (box = doc.getBoxObjectFor(el)) && (box.screenX < 0 || box.screenY < 0);

  // NOTE(arv): If element is hidden (display none or disconnected or any the
  // ancestors are hidden) we get (0,0) by default but we still do the
  // accumulation of scroll position.

  // TODO(arv): Should we check if the node is disconnected and in that case
  //            return (0,0)?

  var pos = new goog.math.Coordinate(0, 0);
  var viewportElement = goog.style.getClientViewportElement(doc);
  if (el == viewportElement) {
    // viewport is always at 0,0 as that defined the coordinate system for this
    // function - this avoids special case checks in the code below
    return pos;
  }

  // IE, Gecko 1.9+, and most modern WebKit.
  if (goog.style.supportsGetBoundingClientRect_(el)) {
    box = goog.style.getBoundingClientRect_(el);
    // Must add the scroll coordinates in to get the absolute page offset
    // of element since getBoundingClientRect returns relative coordinates to
    // the viewport.
    var scrollCoord = goog.dom.getDomHelper(doc).getDocumentScroll();
    pos.x = box.left + scrollCoord.x;
    pos.y = box.top + scrollCoord.y;

  // Gecko prior to 1.9.
  } else if (doc.getBoxObjectFor && !BUGGY_GECKO_BOX_OBJECT) {
    // Gecko ignores the scroll values for ancestors, up to 1.9.  See:
    // https://bugzilla.mozilla.org/show_bug.cgi?id=328881 and
    // https://bugzilla.mozilla.org/show_bug.cgi?id=330619

    box = doc.getBoxObjectFor(el);
    // TODO(user): Fix the off-by-one error when window is scrolled down
    // or right more than 1 pixel. The viewport offset does not move in lock
    // step with the window scroll; it moves in increments of 2px and at
    // somewhat random intervals.
    var vpBox = doc.getBoxObjectFor(viewportElement);
    pos.x = box.screenX - vpBox.screenX;
    pos.y = box.screenY - vpBox.screenY;

  // Safari, Opera and Camino up to 1.0.4.
  } else {
    var parent = el;
    do {
      pos.x += parent.offsetLeft;
      pos.y += parent.offsetTop;
      // For safari/chrome, we need to add parent's clientLeft/Top as well.
      if (parent != el) {
        pos.x += parent.clientLeft || 0;
        pos.y += parent.clientTop || 0;
      }
      // In Safari when hit a position fixed element the rest of the offsets
      // are not correct.
      if (goog.userAgent.WEBKIT &&
          goog.style.getComputedPosition(parent) == 'fixed') {
        pos.x += doc.body.scrollLeft;
        pos.y += doc.body.scrollTop;
        break;
      }
      parent = parent.offsetParent;
    } while (parent && parent != el);

    // Opera & (safari absolute) incorrectly account for body offsetTop.
    if (goog.userAgent.OPERA || (goog.userAgent.WEBKIT &&
        positionStyle == 'absolute')) {
      pos.y -= doc.body.offsetTop;
    }

    for (parent = el; (parent = goog.style.getOffsetParent(parent)) &&
        parent != doc.body && parent != viewportElement; ) {
      pos.x -= parent.scrollLeft;
      // Workaround for a bug in Opera 9.2 (and earlier) where table rows may
      // report an invalid scroll top value. The bug was fixed in Opera 9.5
      // however as that version supports getBoundingClientRect it won't
      // trigger this code path. https://bugs.opera.com/show_bug.cgi?id=249965
      if (!goog.userAgent.OPERA || parent.tagName != 'TR') {
        pos.y -= parent.scrollTop;
      }
    }
  }

  return pos;
}