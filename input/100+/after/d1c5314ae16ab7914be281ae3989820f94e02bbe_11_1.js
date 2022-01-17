function(s) {
  pv.Bar.prototype.buildInstance.call(this, s);
  if (!s.children) s.children = [];

  /*
   * Multiply the current scale factor by this panel's transform. Also clear the
   * default index as we recurse into child marks; it will be reset to the
   * current index when the next panel instance is built.
   */
  var scale = this.scale * s.transform.k, child, n = this.children.length;
  pv.Mark.prototype.index = -1;

  /*
   * Build each child, passing in the parent (this panel) scene graph node. The
   * child mark's scene is initialized from the corresponding entry in the
   * existing scene graph, such that properties from the previous build can be
   * reused; this is largely to facilitate the recycling of SVG elements.
   */
  for (var i = 0; i < n; i++) {
    child = this.children[i];
    child.scene = s.children[i]; // possibly undefined
    child.scale = scale;
    child.build();
  }

  /*
   * Once the child marks have been built, the new scene graph nodes are removed
   * from the child marks and placed into the scene graph. The nodes cannot
   * remain on the child nodes because this panel (or a parent panel) may be
   * instantiated multiple times!
   */
  for (var i = 0; i < n; i++) {
    child = this.children[i];
    s.children[i] = child.scene;
    delete child.scene;
    delete child.scale;
  }

  /* Delete any expired child scenes. */
  s.children.length = n;
}