function() {
  var scene = this.scene, stack = pv.Mark.stack;
  if (!scene) {
    scene = this.scene = [];
    scene.mark = this;
    scene.type = this.type;
    scene.childIndex = this.childIndex;
    if (this.parent) {
      scene.parent = this.parent.scene;
      scene.parentIndex = this.parent.index;
    }
  }

  /* Evaluate defs. */
  if (this.binds.defs.length) {
    var defs = scene.defs;
    if (!defs) scene.defs = defs = {values: {}, locked: {}};
    for (var i = 0; i < this.binds.defs.length; i++) {
      var d = this.binds.defs[i];
      if (!(d.name in defs.locked)) {
        defs.values[d.name] = d.type == 1
            ? d.value.apply(this, stack)
            : d.value;
      }
    }
  }

  /* Evaluate special data property. */
  var data = this.binds.data;
  switch (data.type) {
    case 0:
    case 1: data = defs.values.data; break;
    case 2: data = data.value; break;
    case 3: data = data.value.apply(this, stack); break;
  }

  /* Create, update and delete scene nodes. */
  var index = this.index;
  stack.unshift(null);
  scene.length = data.length;
  for (var i = 0; i < data.length; i++) {
    pv.Mark.prototype.index = this.index = i;
    var s = scene[i];
    if (!s) scene[i] = s = {};
    s.data = stack[0] = data[i];
    this.buildInstance(s);
  }
  pv.Mark.prototype.index = -1;
  stack.shift();

  /* Restore the old index, if any. */
  if (index != -1) this.index = index;
  else delete this.index;

  return this;
}