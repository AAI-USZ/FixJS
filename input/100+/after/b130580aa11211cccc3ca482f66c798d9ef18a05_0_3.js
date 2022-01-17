function (parent, child, callback) {
      var key = factory.lowerResource + '_id',
          id  = parent._id || parent,
          cid = child._id || resourceful.uuid.v4();

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

      child._id = factory.lowerResource + '/' + id + '/' + cid;

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