function(o, nodes, rite){
    var i, node, skip, len, val, ivar, start, inc, rcache, __len, __ref, __results = [];
    for (i = 0, __len = nodes.length; i < __len; ++i) {
      node = nodes[i];
      if (node.isEmpty()) {
        continue;
      }
      if (node instanceof Splat) {
        len && node.carp('multiple splat in an assignment');
        skip = (node = node.it).isEmpty();
        if (i + 1 === (len = nodes.length)) {
          if (skip) {
            break;
          }
          val = Arr.wrap(JS(util('slice') + '.call(' + rite + (i ? ", " + i + ")" : ')')));
        } else {
          val = ivar = rite + ".length - " + (len - i - 1);
          if (skip && i + 2 === len) {
            continue;
          }
          start = i + 1;
          this.temps = [ivar = o.scope.temporary('i')];
          val = skip
            ? (node = Var(ivar), Var(val))
            : Arr.wrap(JS(i + " < (" + ivar + " = " + val + ")\ ? " + util('slice') + ".call(" + rite + ", " + i + ", " + ivar + ")\ : (" + ivar + " = " + i + ", [])"));
        }
      } else {
        (inc = ivar) && start < i && (inc += " + " + (i - start));
        val = Chain(rcache || (rcache = Literal(rite)), [Index(JS(inc || i))]);
      }
      __results.push((__ref = __clone(this), __ref.left = node, __ref.right = val, __ref['void'] = true, __ref).compile(o, LEVEL_PAREN));
    }
    return __results;
  }