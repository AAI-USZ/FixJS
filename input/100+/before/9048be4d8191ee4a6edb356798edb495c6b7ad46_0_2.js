function(callback) {
      clearTimeout(this.disabledCheckingLimitsTimeout);
      this.isDisabledCheckingLimits = false;
      this.isDropDisabled = false;
      this.transitioning = false;
      this.dragging = false;

      var doFinishDrag = function() {
        delete container.dataset.dragging;
        // When the drag&drop is finished we need to check empty pages
        // and overflows
        checkOverflowPages();
        checkEmptyPages();
        callback();
      }

      var currentPage = pageHelper.getCurrent();
      if (currentPage.ready) {
        draggableIcon.onDragStop(doFinishDrag);
      } else {
        // Probably users release the draggable icon before re-arranged
        currentPage.onReady = function fn_ready () {
          delete currentPage.onReady;
          draggableIcon.onDragStop(doFinishDrag);
        }
      }

    }