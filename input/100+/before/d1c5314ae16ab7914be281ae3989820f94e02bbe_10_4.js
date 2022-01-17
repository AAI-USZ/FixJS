function() {
  var scene = this.scene;
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

  /* Set the data stack. */
  var stack = this.root.scene.data;
  if (!stack) this.root.scene.data = stack = argv(this.parent);

  /* Evaluate defs. */
  if (this.binds.defs.length) {
    var defs = scene.defs;
    if (!defs) scene.defs = defs = {values: {}, locked: {}};
    for (var i = 0; i < this.binds.defs.length; i++) {
      var d = this.binds.defs[i];
      if (!(d.name in defs.locked)) {
        var v = d.value;
        if (d.type == 1) {
          property = d.name;
          v = v.apply(this, stack);
        }
        defs.values[d.name] = v;
      }
    }
  }

  /* Evaluate special data property. */
  var data = this.binds.data;
  switch (data.type) {
    case 0: case 1: data = defs.values.data; break;
    case 2: data = data.value; break;
    case 3: {
      property = "data";
      data = data.value.apply(this, stack);
      break;
    }
  }

  /* Create, update and delete scene nodes. */
  stack.unshift(null);
  scene.length = data.length;
  for (var i = 0; i < data.length; i++) {
    pv.Mark.prototype.index = this.index = i;
    var s = scene[i];
    if (!s) scene[i] = s = {};
    s.data = stack[0] = data[i];
    this.buildInstance(s);
  }
  stack.shift();
  delete this.index;
  pv.Mark.prototype.index = -1;
  if (!this.parent) scene.data = null;

  return this;
}