function (path, val, type) {
  var constructing = true === type
    , adhoc = type && true !== type
    , adhocs

  if (adhoc) {
    adhocs = this._adhocPaths || (this._adhocPaths = {});
    adhocs[path] = Schema.interpretAsType(path, type);
  }

  if ('string' !== typeof path) {
    // new Document({ key: val })

    if (null === path || undefined === path) {
      var _ = path;
      path = val;
      val = _;

    } else {
      var prefix = val
        ? val + '.'
        : '';

      if (path instanceof Document) path = path._doc;

      var keys = Object.keys(path)
        , i = keys.length
        , pathtype
        , key

      while (i--) {
        key = keys[i];
        if (null != path[key] && 'Object' === path[key].constructor.name
          && !(this._path(prefix + key) instanceof MixedSchema)) {
          this.set(path[key], prefix + key, constructing);
        } else if (this._strictMode) {
          pathtype = this.schema.pathType(prefix + key);
          if ('real' === pathtype || 'virtual' === pathtype) {
            this.set(prefix + key, path[key], constructing);
          }
        } else if (undefined !== path[key]) {
          this.set(prefix + key, path[key], constructing);
        }
      }

      return this;
    }
  }

  // ensure _strict is honored for obj props
  // docschema = new Schema({ path: { nest: 'string' }})
  // doc.set('path', obj);
  var pathType = this.schema.pathType(path);
  if ('nested' == pathType && val && 'Object' == val.constructor.name) {
    this.set(val, path, constructing);
    return this;
  }

  var schema;
  if ('adhocOrUndefined' == pathType && this._strictMode) {
    return this;
  } else if ('virtual' == pathType) {
    schema = this.schema.virtualpath(path);
    schema.applySetters(val, this);
    return this;
  } else {
    schema = this._path(path);
  }

  var parts = path.split('.')
    , obj = this._doc
    , self = this
    , pathToMark
    , subpaths
    , subpath

  // When using the $set operator the path to the field must already exist.
  // Else mongodb throws: "LEFT_SUBFIELD only supports Object"

  if (parts.length <= 1) {
    pathToMark = path;
  } else {
    subpaths = parts.map(function (part, i) {
      return parts.slice(0, i).concat(part).join('.');
    });

    for (var i = 0, l = subpaths.length; i < l; i++) {
      subpath = subpaths[i];
      if (this.isDirectModified(subpath) // earlier prefixes that are already
                                         // marked as dirty have precedence
          || this.get(subpath) === null) {
        pathToMark = subpath;
        break;
      }
    }

    if (!pathToMark) pathToMark = path;
  }

  if ((!schema || null === val || undefined === val) ||
    this.try(function(){
      // if this doc is being constructed we should not
      // trigger getters.
      var cur = constructing ? undefined : self.get(path);
      var casted = schema.cast(val, self, false, cur);
      val = schema.applySetters(casted, self);
    })) {

    if (this.isNew) {
      this.markModified(pathToMark);
    } else {
      var priorVal = this.get(path);

      if (!this.isDirectModified(pathToMark)) {
        if (undefined === val && !this.isSelected(path)) {
          // special case:
          // when a path is not selected in a query its initial
          // value will be undefined.
          this.markModified(pathToMark);
        } else if (!deepEqual(val, priorVal)) {
          this.markModified(pathToMark);
        } else if (!constructing &&
                   null != val &&
                   path in this._activePaths.states.default &&
                   deepEqual(val, schema.getDefault(this))) {
          // special case:
          // a path with a default was $unset on the server
          // and the user is setting it to the same value again
          this.markModified(pathToMark);
        }
      }
    }

    for (var i = 0, l = parts.length; i < l; i++) {
      var next = i + 1
        , last = next === l;

      if (last) {
        obj[parts[i]] = val;
      } else {
        if (obj[parts[i]] && 'Object' === obj[parts[i]].constructor.name) {
          obj = obj[parts[i]];
        } else if (obj[parts[i]] && Array.isArray(obj[parts[i]])) {
          obj = obj[parts[i]];
        } else {
          obj = obj[parts[i]] = {};
        }
      }
    }
  }

  return this;
}