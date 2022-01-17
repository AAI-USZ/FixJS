f  var klass;
  if (base._isObject) {
    base = base._klass;
  }

  if (superklass === null) {
    superklass = Object;
  }

  if (__hasOwn.call(base._scope, id)) {
    klass = base._scope[id];
  }
  else {
    if (!superklass._name) { //!superklass._methods) {
      var bridged = superklass;
      superklass  = Object;
      // constructor = superklass;
      // klass       = bridge_class(bridged);
    }
    // else {
      klass = boot_class(superklass, constructor);
    // }

    if (bridged) {
      bridged.prototype.$m = klass.$m_tbl;
      bridged.prototype.$k = klass;
    }

    klass._name = (base === Object ? id : base._name + '::' + id);

    var const_alloc   = function() {};
    var const_scope   = const_alloc.prototype = new base._scope.alloc();
    klass._scope      = const_scope;
    const_scope.alloc = const_alloc;

    base[id] = base._scope[id] = klass;

    if (superklass.$m.inherited) {
      superklass.$m.inherited(superklass, 'inherited', klass);
    }
  }

  return klass;
};
