function(callback) {
      clearTimeout(this.translatingTimeout);
      this.isTranslatingPages = false;
      this.dragging = false;
      draggableIcon.onDragStop(function() {
        delete container.dataset.dragging;
        // When the drag&drop is finished we need to check empty pages
        // and overflows
        checkOverflowPages();
        checkEmptyPages();
        callback();
      });
    }