function (parent, child, callback) {
      var key = factory.lowerResource + '_id',
          id  = parent._id;

      function notifyParent(c, callback) {
        factory.get(id, function(err, p) {
          if(err) {
            if(callback) return callback(err);
          }

          //
          // TODO: We shouldn't have to reduce ID's here, something is wrong
          //
          if(p[rstring + '_ids'].length > 0) {
            p[rstring + '_ids'] = p[rstring + '_ids'].reduce(function(i){
              if(typeof i === "string") {
                var x = i.split('/');
                x = x[0];
                if(x === id) {
                  return i;
                }
              }
            });
          }

          if (p[rstring + '_ids'] && !Array.isArray(p[rstring + '_ids'])) {
            p[rstring + '_ids'] = [p[rstring + '_ids']];
          } else {
            p[rstring + '_ids'] = [];
          }

          //
          // Don't double append resource names for self-referencing relationships
          //
          p[rstring + '_ids'].push(c._id || c.id);

          p.save(function(err, result){
            callback(err, child);
          });
        });
      }

      if (child._id) {
        //
        // Remark: If the factory.resource is equal to rstring,
        // it means that the resource's parent is itself
        //
        if(factory.lowerResource === rstring) {
          child = new factory(child);
        } else {
          //
          // Else, the resource's parent is rstring
          //
          child._id = rstring + '/' + parent.resource.toLowerCase() + '/' + id + '/' + child._id;
        }
      } else {
        child._id = rstring + '/' + parent._id + '/' + resourceful.uuid.v4();
      }

      if (child instanceof rfactory) {
        var x = parent._id;
        child[key] = id.replace(rfactory + '/', '');
        x = x.split('/');
        x = x[x.length-1];
        child._id = x + '/' + child._id;
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