function(overlapElem) {
      draggableIcon.onDragMove(status.cCoords.x, status.cCoords.y);
      this.checkLimits();
      if (!this.isDropDisabled) {
        var className = overlapElem.className;
        if (className === 'icon' || className === 'options') {
          var overlapElemOrigin = overlapElem.dataset.origin;
          pageHelper.getCurrent().drop(draggableIconOrigin, overlapElemOrigin);
        } else if (overlapElem.className === 'page') {
          var currentPage = pageHelper.getCurrent();
          var lastIcon = currentPage.getLastIcon();
          if (status.cCoords.y > lastIcon.getTop()
              && overlapElem !== lastIcon) {
            currentPage.drop(draggableIconOrigin, lastIcon.getOrigin());
          }
        }
      }
    }