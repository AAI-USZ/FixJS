function mouseup(e) {
    if (!scene) { return; }
    pv.Mark.dispatch("selectend", scene, index, e);
    scene.mark.selectionRect = null;
    scene = null;
  }