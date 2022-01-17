function gm_onDragStop() {
      delete document.body.dataset.dragging;
      checkOverflowPages();
      checkEmptyPages();
      delete document.body.dataset.transitioning;
    }