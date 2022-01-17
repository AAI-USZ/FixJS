function(id, constructor, superklass) {
  if (superklass) {
    var ctor           = function() {};
        ctor.prototype = superklass.prototype;

    constructor.prototype = new ctor();
  }

  // method table constructor;
  var m_ctr = function() {};

  if (superklass) {
    // not BasicObject
    m_ctr.prototype = new superklass.$m_ctr;
  }
  else {
    // BasicObject
    m_ctr.prototype = RootMethodTable;
  }

  var    m_tbl = m_ctr.prototype;
  m_tbl.constructor = m_ctr;

  var prototype = constructor.prototype;

  prototype.constructor = constructor;
  prototype._isObject   = true;
  prototype.$k      = constructor;

  // method table of instances
  prototype.$m          = m_tbl;

  // constructor._included_in  = [];
  // constructor._isClass      = true;
  // constructor._name         = id;
  // constructor._super        = superklass;
  // constructor._methods      = [];
  // constructor._smethods     = [];
  constructor._isObject     = false;

  // method table for class methods
  // constructor.$m            = c_tbl;
  // method table of instances
  constructor.$m_tbl        = m_tbl;
  // method table constructor of instances
  constructor.$m_ctr        = m_ctr;

  constructor._name         = id;

  constructor._donate = __donate;
  constructor._sdonate = __sdonate;

  Opal[id] = constructor;

  return constructor;
}