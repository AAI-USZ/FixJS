function(mark, depth) {
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