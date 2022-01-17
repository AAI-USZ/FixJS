function(snapshot, op) {
    var component, deleted, _i, _len;
    checkValidOp(op);
    for (_i = 0, _len = op.length; _i < _len; _i++) {
      component = op[_i];
      if (component.i != null) {
        snapshot = strInject(snapshot, component.p, component.i);
      } else {
        deleted = snapshot.slice(component.p, (component.p + component.d.length));
        if (component.d !== deleted) {
          throw new Error("Delete component '" + component.d + "' does not match deleted text '" + deleted + "'");
        }
        snapshot = snapshot.slice(0, component.p) + snapshot.slice(component.p + component.d.length);
      }
    }
    return snapshot;
  }