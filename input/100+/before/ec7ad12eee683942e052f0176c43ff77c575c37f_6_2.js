function icon_onDragStop() {
    delete this.container.dataset.dragging;
    this.dragabbleSection.removeChild(this.draggableElem);
  }