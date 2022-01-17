function onLongPress(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    document.body.dataset.mode = 'edit';

    if ('origin' in evt.target.dataset) {
      document.body.dataset.transitioning = true;
      DragDropManager.start(evt, {x: evt.pageX, y: evt.pageY});
    }
  }