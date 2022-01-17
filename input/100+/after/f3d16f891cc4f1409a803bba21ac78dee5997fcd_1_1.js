function icon_onDragStart(x, y) {
    this.initX = x;
    this.initY = y;

    var draggableElem = this.draggableElem = document.createElement('div');
    draggableElem.className = 'draggable';

    draggableElem.appendChild(this.icon.cloneNode());

    var container = this.container;
    container.dataset.dragging = 'true';

    var rectangle = container.getBoundingClientRect();
    var style = draggableElem.style;
    style.left = rectangle.left + 'px';
    style.top = rectangle.top + 'px';
    this.initXCenter = (rectangle.left + rectangle.right) / 2;
    this.initYCenter = (rectangle.top + rectangle.bottom) / 2;

    this.dragabbleSection.appendChild(draggableElem);
  }