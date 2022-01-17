function fn_ready () {
          delete currentPage.onReady;
          draggableIcon.onDragStop(doFinishDrag);
        }