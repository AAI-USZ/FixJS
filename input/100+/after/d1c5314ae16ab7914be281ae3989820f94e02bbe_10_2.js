function() {
  /* For the first render, take it from the top. */
  if (!this.root.scene && this.parent) {
    this.root.render();
    return;
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

  /**
   * @private Recursively renders the current instance of the specified mark.
   * This is slightly tricky because `index` and `scene` properties may or may
   * not already be set; if they are set, it means we are rendering only a
   * specific instance; if they are unset, we are rendering all instances.
   * Furthermore, we must preserve the original context of these properties when
   * rendering completes.
   *
   * <p>Another tricky aspect is that the `scene` attribute should be set for
   * any preceding children, so as to allow property chaining. This is
   * consistent with first-pass rendering.
   */
  function renderInstance(mark, depth, scale) {
    var s = mark.scene[mark.index], i;
    if (s.visible) {
      var childIndex = indexes[depth], child = mark.children[childIndex];

      /* Set preceding child scenes. */
      for (i = 0; i < childIndex; i++) {
        mark.children[i].scene = s.children[i];
      }

      /* Set current child scene, if necessary. */
      stack[0] = s.data;
      if (child.scene) {
        render(child, depth + 1, scale * s.transform.k);
      } else {
        child.scene = s.children[childIndex];
        render(child, depth + 1, scale * s.transform.k);
        delete child.scene;
      }

      /* Clear preceding child scenes. */
      for (i = 0; i < childIndex; i++) {
        delete mark.children[i].scene;
      }
    }
  }

  /* Bind this mark's property definitions. */
  this.bind();

  /* Recursively render all instances of this mark. */
  var stack = pv.Mark.stack, indexes = [];
  for (var m = this; m.parent; m = m.parent) indexes.unshift(m.childIndex);
  render(this.root, 0, 1);
}