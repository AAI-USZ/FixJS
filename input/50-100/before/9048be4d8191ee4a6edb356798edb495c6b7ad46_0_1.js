function () {
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