function() {
  if (!this.root.scene) {
    /* For the first render, take it from the top. */
    if (this.parent) {
      this.root.render();
      return;
    }
  } else {
    /* Clear the data stack if called from an event handler. */
    delete this.root.scene.data;
  }

  /**
   * @private Finds all instances of this mark and renders them. This method
   * descends recursively to the level of the mark to be rendered, finding all
   * visible instances of the mark. After the marks are rendered, the scene and
   * index attributes are removed from the mark to restore them to a clean
   * state.
   *
   * <p>If an enclosing panel has an index property set (as is the case inside
   * in an event handler), then only instances of this mark inside the given
   * instance of the panel will be rendered; otherwise, all visible instances of
   * the mark will be rendered.
   */
  var render = function(mark, depth) {
    if (depth < indexes.length) {
      var childIndex = indexes[depth], child = mark.children[childIndex];
      if (mark.hasOwnProperty("index")) {
        var i = mark.index;
        if (mark.scene[i].visible) {
          child.scene = mark.scene[i].children[childIndex];
          render(child, depth + 1);
        }
      } else {
        for (var i = 0; i < mark.scene.length; i++) {
          if (mark.scene[i].visible) {
            mark.index = i;
            child.scene = mark.scene[i].children[childIndex];
            render(child, depth + 1);
          }
        }
        delete mark.index;
      }
      delete child.scene;
      return;
    }

    /* Now that the scene stack is set, evaluate the properties. */
    mark.build();

    /*
     * In the update phase, the scene is rendered by creating and updating
     * elements and attributes in the SVG image. No properties are evaluated
     * during the update phase; instead the values computed previously in the
     * build phase are simply translated into SVG. The update phase is decoupled
     * (see pv.Scene) to allow different rendering engines.
     */
    var id = null;
    if (mark.scene && mark.scene.$g && mark.scene.$g.suspendRedraw)
        id = mark.scene.$g.suspendRedraw(1000);
    pv.Scene.updateAll(mark.scene);
    if (id)
        mark.scene.$g.unsuspendRedraw(id);

    delete mark.root.scene.data;
  }

  /* Bind this mark's property definitions. */
  this.bind();

  /* Recursively render all instances of this mark. */
  var indexes = [];
  for (var m = this; m.parent; m = m.parent) indexes.unshift(m.childIndex);
  render(this.root, 0);
}