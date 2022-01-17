function() {
      clearTimeout(this.translatingTimeout);
      this.isTranslatingPages = false;
      this.dragging = false;
      delete container.dataset.dragging;
      draggableIcon.onDragStop();
      // When the drag&drop is finished we need to check empty pages
      // and overflows
      checkOverflowPages();
      checkEmptyPages();
    }