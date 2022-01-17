function icon_onDragStart(x, y) {
    this.initX = x;
    this.initY = y;

    var draggableElem = this.draggableElem = this.icon.cloneNode();
    draggableElem.className = 'draggable';

    var container = this.container;
    container.dataset.dragging = 'true';

    var rectangle = container.getBoundingClientRect();
    var style = draggableElem.style;
    style.left = rectangle.left + 'px';
    style.top = rectangle.top + 'px';

    this.dragabbleSection.appendChild(draggableElem);
  }