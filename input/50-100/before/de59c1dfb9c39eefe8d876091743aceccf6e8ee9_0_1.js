function onLongPress(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    document.body.dataset.mode = 'edit';

    if ('origin' in evt.target.dataset) {
      DragDropManager.start(evt, {x: evt.pageX, y: evt.pageY});
    }
  }