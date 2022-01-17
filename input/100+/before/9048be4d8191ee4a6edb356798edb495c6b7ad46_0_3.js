function(overlapElem) {
      draggableIcon.onDragMove(status.cCoords.x, status.cCoords.y);
      var currentPage = pageHelper.getCurrent();
      if (currentPage.ready) {
        this.checkLimits();
        if (!this.isDropDisabled) {
          var className = overlapElem.className;
          if (className === 'icon' || className === 'options') {
            var overlapElemOrigin = overlapElem.dataset.origin;
            currentPage.drop(draggableIconOrigin, overlapElemOrigin);
          } else if (overlapElem.className === 'page') {
            var lastIcon = currentPage.getLastIcon();
            if (lastIcon && status.cCoords.y > lastIcon.getTop()
                && overlapElem !== lastIcon) {
              currentPage.drop(draggableIconOrigin, lastIcon.getOrigin());
            }
          }
        }
      } else {
        currentPage.onReady = function () {
          // After re-arranged the overlap element could be different so we
          // create a mousemove event with the same coordinates than the last
          // mousedown event
          delete currentPage.onReady;
          var win = document.defaultView;
          var mousemove = document.createEvent('MouseEvent');
          mousemove.initMouseEvent(
            'mousemove', true, true, win, 0,
            status.cCoords.x + win.mozInnerScreenX, status.cCoords.y +
            win.mozInnerScreenY, status.cCoords.x,
            status.cCoords.y, false, false, false, false, 0, null);
          win.dispatchEvent(mousemove);
        }
      }
    }