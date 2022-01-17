function needsScrollbar() {
      var realHeight = doc.height * textHeight() + 2 * paddingTop();
      return realHeight - 1 > scroller.offsetHeight;
    }