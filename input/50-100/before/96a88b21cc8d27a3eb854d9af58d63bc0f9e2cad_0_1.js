function mouseMoveHandler(e, position) {

  if (!this.handles.initialized) return;
  if (!this.handles.moveHandler) return;

  var
    delta = position.dX,
    selection = this.selection.selection,
    area = this.selection.getArea(),
    handles = this.handles;

  handles.moveHandler(area, delta);
  checkSwap(area, handles);

  this.selection.setSelection(area);
}