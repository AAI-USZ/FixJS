function(scope){
    var params, body, names, assigns, i, p, splace, rest, that, dic, vr, df, v, name, __len, __i, __ref, __ref1;
    params = this.params, body = this.body;
    names = [];
    assigns = [];
    for (i = 0, __len = params.length; i < __len; ++i) {
      p = params[i];
      if (p instanceof Splat) {
        splace = i;
      } else if (p.op === '=' && !p.logic) {
        params[i] = Binary('?', p.left, p.right);
      }
    }
    if (splace != null) {
      rest = params.splice(splace, 9e9);
      if (!rest[1] && rest[0].it.isEmpty()) {
        rest = 0;
      }
    } else if (this.accessor) {
      if (that = params[1]) {
        that.carp('excess accessor parameter');
      }
    } else if (!(params.length || this.wrapper)) {
      if (body.traverseChildren(function(it){
        return it.value === 'it' || null;
      })) {
        params[0] = Var('it');
      }
    }
    if (params.length) {
      dic = {};
      for (__i = 0, __len = params.length; __i < __len; ++__i) {
        p = params[__i];
        vr = p;
        if (df = vr.getDefault()) {
          vr = vr.first;
        }
        if (vr.isEmpty()) {
          vr = Var(scope.temporary('arg'));
        } else if (!(vr instanceof Var)) {
          v = Var((__ref1 = (__ref = vr.it || vr).name, delete __ref.name, __ref1) || vr.varName() || scope.temporary('arg'));
          assigns.push(Assign(vr, df ? Binary(p.op, v, p.second) : v));
          vr = v;
        } else if (df) {
          assigns.push(Assign(vr, p.second, '=', p.op, true));
        }
        names.push(name = scope.add(vr.value, 'arg', p));
        if (!(dic[name + "."] = dic[name + "."] ^ 1)) {
          p.carp("duplicate parameter \"" + name + "\"");
        }
      }
    }
    if (rest) {
      while (splace--) {
        rest.unshift(Arr());
      }
      assigns.push(Assign(Arr(rest), Literal('arguments')));
    }
    if (assigns.length) {
      (__ref = this.body).prepend.apply(__ref, assigns);
    }
    return names.join(', ');
  }