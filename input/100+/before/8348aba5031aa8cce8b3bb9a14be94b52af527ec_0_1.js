function meta(obj, writable) {

  var ret = obj[META_KEY];
  if (writable===false) return ret || EMPTY_META;

  if (!ret) {
    o_defineProperty(obj, META_KEY, META_DESC);

    if (isDefinePropertySimulated) {
      // on platforms that don't support enumerable false
      // make meta fail jQuery.isPlainObject() to hide from
      // jQuery.extend() by having a property that fails
      // hasOwnProperty check.
      ret = o_create({__preventPlainObject__: true});
    }

    ret = {
      descs: {},
      watching: {},
      cache:  {},
      source: obj
    };

    if (MANDATORY_SETTER) { ret.values = {}; }

    obj[META_KEY] = ret;

    // make sure we don't accidentally try to create constructor like desc
    ret.descs.constructor = null;

  } else if (ret.source !== obj) {
    ret = o_create(ret);
    ret.descs    = o_create(ret.descs);
    ret.watching = o_create(ret.watching);
    ret.cache    = {};
    ret.source   = obj;

    if (MANDATORY_SETTER) { ret.values = o_create(ret.values); }

    obj[META_KEY] = ret;
  }
  return ret;
}