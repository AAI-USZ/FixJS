function updateVerticalScroll(scrollTop) {
      var showScrollbar = scroller.scrollHeight > scroller.offsetHeight;
      scrollbar.style.display = showScrollbar ? "block" : "none";
      if (showScrollbar) {
        scrollbarInner.style.height = scroller.scrollHeight + "px";
        scrollbar.style.height = scroller.offsetHeight + "px";
        if (scrollTop != null) scrollbar.scrollTop = scrollTop;
      }
      // Position the mover div to align with the current virtual scroll position
      mover.style.top = (displayOffset * textHeight() - scrollbar.scrollTop) + "px";
    }