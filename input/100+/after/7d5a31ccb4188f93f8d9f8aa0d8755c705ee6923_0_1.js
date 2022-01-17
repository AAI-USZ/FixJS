function relationship(factory, type, r, options) {
  var engine = factory.engine,
      rfactory,     // Resource factory/constructor
      rstring,      // Resource string
      rstringp,     // Resource pluralized string
      rstringc;     // Resource capitalized string

  if (typeof(r) === 'string') {
    rstringc = resourceful.capitalize(r);
    rfactory = resourceful.resources[rstringc];

    // We're dealing with .child('name-of-this-resource')
    if (!rfactory && rstringc === factory.resource) {
      rfactory = factory;
    }
  } else if (typeof(r) === 'function') {
    rstringc = r.resource;
    rfactory = r;
  } else {
    throw new(TypeError)("argument must be a string or constructor");
  }

  rstring  = rfactory.lowerResource;
  rstringp = resourceful.pluralize(rstring);

  if (rfactory === undefined) throw new Error("unknown resource " + rstring);

  if (type == 'child') {
    if (factory._children.indexOf(rstringc) !== -1) return;

    factory._children.push(rstringc);
    factory.property(rstring + '_ids', Array, { 'default': [], required: true });
    //
    // Parent.children(id, callback)
    //
    if (engine._children) {
      engine._children.call(this, factory, rstringp, rfactory);
    } else {
      factory[rstringp] = function (id, callback) {
        return rfactory['by' + factory.resource](id, callback)
      };
    }
    //
    // parent.children(callback)
    //
    factory.prototype[rstringp] = function (callback) {
      return this.constructor[rstringp](this.key, callback);
    };

    //
    // Parent.createChild(id, child, callback)
    //
    factory['create' + rstringc] = function (parent, child, callback) {
      var key = factory.lowerResource + '_id',
          id  = parent.key || parent,
          cid = child[rfactory.key] || resourceful.uuid.v4();

      function notifyParent(c, callback) {
        factory.get(id, function(err, p) {
          if(err) {
            if(callback) return callback(err);
          }

          var rstringi = rstring + '_ids';

          if (p[rstringi] && !Array.isArray(p[rstringi])) {
            p[rstringi] = [p[rstringi]];
          }
          p[rstringi] = p[rstringi] || [];

          if (p[rstringi].indexOf(cid) < 0) {
            p[rstringi].push(cid);
          }

          p.save(function(err, result){
            callback(err, c);
          });
        });
      }

      child[rfactory.key] = factory.lowerResource + '/' + id + '/' + cid;

      if (child instanceof rfactory) {
        child[key] = id;
        child.save(function(err) {
          if(err) {
            if(callback) return callback(err);
          }
          notifyParent(child, callback);
        });
      } else {
        var inheritance = {};
        inheritance[key] = id;
        child = resourceful.mixin({}, child, inheritance);
        rfactory.create(child, function(err, c) {
          if(err) {
            if(callback) return callback(err);
          }
          notifyParent(c, function(e, r) {
            if(e) {
              if(callback) return callback(e);
            } else {
              if(callback) callback(err, r);
            }
          });
        });
      }
    }

    //
    // parent.createChild(child, callback)
    //
    factory.prototype['create' + rstringc] = function (child, callback) {
      factory['create' + rstringc](this, child, callback);
    };

    factory.before('destroy', function (obj, next) {
      obj = obj[rfactory.key] || obj;
      obj = obj.split('/').slice(1).join('/');

      factory.get(obj, function (e, p) {
        if (e) { return next(e); }

        p[rstringp](function (e, c) {
          if (e) { return next(e); }

          resourceful.async.forEachSeries(c, function (i, cb) {
            i.destroy(cb);
          }, function (e) {
            next(e);
          });
        });
      });
    });

    // Notify child about new parent
    rfactory.parent(factory);
  } else {
    if (factory._parents.indexOf(rstringc) !== -1) return;

    factory._parents.push(rstringc);

    //
    // Child.byParent(id, callback)
    //
    if (engine._byParent) {
      engine._byParent.call(factory._connection, factory, rfactory);
    } else {
      factory['by' + rstringc] = function (id, callback) {
        var filter = {};
        filter[rstring + '_id'] = id;
        factory.find(filter, callback);
      };
    }

    //
    // child.parent(callback)
    //
    factory.prototype[rstring] = function (callback) {
      return rfactory.get(this[rstring + '_id'], callback);
    };
    factory.property(rstring + '_id', [String, null], {
      'default': null,
      required: true
    });

    factory.before('destroy', function(obj, next) {
      obj = obj[rfactory.key] || obj;
      obj = obj.split('/').slice(1).join('/');

      factory.get(obj, function(e, c) {
        if(e) { return next(e); }

        c[rstring](function(err, p) {
          if(err) { return next(err); }
          var key = factory.lowerResource + '_ids';
          obj = obj.replace(rfactory.lowerResource + '/' + p.key + '/', '');

          if(p[key].indexOf(obj) > -1) {
            p[key].splice(p[key].indexOf(obj), 1);
            p.save(function(err) {
              if(err) { return next(err); }
              next();
            });
          } else {
            next();
          }
        });
      });
    });

    // Notify parent about new child
    rfactory.child(factory);
  }
}