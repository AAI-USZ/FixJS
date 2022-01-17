function add(view, list, index, howMany) {
    var render = view.data(hdRenderName);
    /* `hdMirror` is a JavaScript array mirroring `list`, but with an extra
     * placeholder at the end.
     *  - Each element in the array is a jQuery object. 
     *  - The last element is an empty-string text node. It provides an
     *    insertion point for $.before.
     *  - Every other element is a clone of `template` bound to the
     *    corresponding element in `list`.
     *  - Corresponding elements in `hdMirror` and `list` have the same
     *    index. 
     */
    var mirror = view.data(hdMirrorName);
    var slot = mirror[index];
    var copies = [];
    var i;

    for (i = 0; i < howMany; ++i) {
      var copy = render(list[index + i]);
      copies[i] = copy;
      slot.first().before(copy);
    }

    copies.unshift(index, 0);
    Array.prototype.splice.apply(mirror, copies);
  }