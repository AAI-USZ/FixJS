function render(mark, depth, scale) {
    mark.scale = scale;
    if (depth < indexes.length) {
      stack.unshift(null);
      if (mark.hasOwnProperty("index")) {
        renderInstance(mark, depth, scale);
      } else {
        for (var i = 0, n = mark.scene.length; i < n; i++) {
          mark.index = i;
          renderInstance(mark, depth, scale);
        }
        delete mark.index;
      }
      stack.shift();
    } else {
      mark.build();

      /*
       * In the update phase, the scene is rendered by creating and updating
       * elements and attributes in the SVG image. No properties are evaluated
       * during the update phase; instead the values computed previously in the
       * build phase are simply translated into SVG. The update phase is
       * decoupled (see pv.Scene) to allow different rendering engines.
       */
      pv.Scene.scale = scale;

      var id = null; // SVGWeb performance enhancement. 
      if (mark.scene && mark.scene.$g && mark.scene.$g.suspendRedraw)
        id = mark.scene.$g.suspendRedraw(1000);

      pv.Scene.updateAll(mark.scene);

      if (id) // SVGWeb performance enhancement. 
          mark.scene.$g.unsuspendRedraw(id);
    }
    delete mark.scale;
  }