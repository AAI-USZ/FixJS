function gm_onDragStop() {
      delete document.body.dataset.dragging;
      delete document.body.dataset.transitioning;
      checkOverflowPages();
      checkEmptyPages();
    }