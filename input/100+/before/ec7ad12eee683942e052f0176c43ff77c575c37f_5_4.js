function(overlapElem) {
      draggableIcon.onDragMove(status.cCoords.x, status.cCoords.y);
      this.checkLimits();
      if (!this.isDropDisabled) {
        var className = overlapElem.className;
        if (className === 'icon' || className === 'options') {
          var overlapElemOrigin = overlapElem.dataset.origin;
          // Draggable cannot be the same element for dropping
          if (overlapElemOrigin !== draggableIconOrigin) {
            var dir = getDirection();
            if (dir !== status.pDir || overlapElemOrigin !== status.dropped) {
              // Changing positions when:
              // 1) User change the direction of the gesture or...
              // 2) It's another element different than previously dropped
              pageHelper.getCurrent().drop(draggableIconOrigin,
                                           overlapElemOrigin, dir);
              status.dropped = overlapElemOrigin;
            }
            status.pDir = dir;
          }
        } else {
          // Dragging outside <ol> element -> move to last position
          var currentPage = pageHelper.getCurrent();
          if (overlapElem.className === 'page' &&
              draggableIcon !== currentPage.getLastIcon()) {
            currentPage.remove(draggableIcon);
            currentPage.append(draggableIcon);
          }
        }
      }
    }