function(callback) {
      clearTimeout(this.disabledCheckingLimitsTimeout);
      this.isDisabledCheckingLimits = false;
      this.isDisabledDrop = false;
      this.transitioning = false;
      this.dragging = false;

      var finishDrag = function() {
        delete container.dataset.dragging;
        // When the drag&drop is finished we need to check empty pages
        // and overflows
        checkOverflowPages();
        checkEmptyPages();
        callback();
      }

      var currentPage = pageHelper.getCurrent();
      if (currentPage.ready) {
        draggableIcon.onDragStop(finishDrag);
      } else {
        // Probably users release the draggable icon before re-arranged
        currentPage.onReArranged = function fn_ready() {
          delete currentPage.onReArranged;
          draggableIcon.onDragStop(finishDrag);
        }
      }

    }