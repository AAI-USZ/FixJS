function dg_move(overlapElem) {
      draggableIcon.onDragMove(status.cCoords.x, status.cCoords.y);

      var currentPage = pageHelper.getCurrent();
      if (!currentPage.ready) {
        currentPage.onReArranged = dispatchMouseMoveEvent;
        return;
      }

      this.checkLimits();
      if (this.isDisabledDrop) {
        return;
      }

      var classList = overlapElem.classList;
      if (classList.contains('icon') || classList.contains('options')) {
        var overlapElemOrigin = overlapElem.dataset.origin;
        currentPage.drop(draggableIconOrigin, overlapElemOrigin);
      } else if (classList.contains('page')) {
        var lastIcon = currentPage.getLastIcon();
        if (lastIcon && status.cCoords.y > lastIcon.getTop() &&
            overlapElem !== lastIcon) {
          currentPage.drop(draggableIconOrigin, lastIcon.getOrigin());
        }
      }
    }