function get(obj, keyName) {
  Ember.assert("You need to provide an object and key to `get`.", !!obj && keyName);

  var meta = obj[META_KEY], desc = meta && meta.descs[keyName], ret;
  if (desc) {
    return desc.get(obj, keyName);
  } else {
    if (MANDATORY_SETTER && meta && meta.watching[keyName] > 0) {
      ret = meta.values[keyName];
    } else {
      ret = obj[keyName];
    }

    if (ret === undefined &&
        'object' === typeof obj && !(keyName in obj) && 'function' === typeof obj.unknownProperty) {
      return obj.unknownProperty(keyName);
    }

    return ret;
  }
}