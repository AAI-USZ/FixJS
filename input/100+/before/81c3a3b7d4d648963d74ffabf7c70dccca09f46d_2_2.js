function(app, db) {
    var baseRoute = '/';

    // construct base route to be in the form /project/:project_id/screens
    var parentKeys = parents.map(function(parentName) {
      var singularName = parentName.substring(0, parentName.length - 1);
      return parentName + '/:' + singularName + '_id';
    });

    if (parentKeys.length > 0) {
      parentKeys[parentKeys.length - 1] += '/';
    }

    baseRoute += parentKeys.join('/') + name;
    var that = this;

    // GET should read
    app.get(baseRoute + '/:id?', function(req, res) {
      if (!req.params.id) {
        // if no id is specified, then return a list of all objects
        that.list(req, db, function(err, objectList) {
          if (err) {
            // TODO: how to handle error?
            throw err;
          } else {
            res.send(objectList);
          }
        });
      } else {
        // otherwise return a specific object
        that.get(req, db, req.params.id, function(err, object) {
          if (err) {
            throw err;
          } else {
            res.send(object);
          }
        });
      }
    });

    // POST should create
    app.post(baseRoute, function(req, res) {
      var result = validateRequest(req);
      if (result !== true) {
        res.send(result, 400);
        return;
      }

      that.add(req, db, function(err, object) {
        if (err) {
          throw err;
        } else {
          res.send(object);
        }
      });
    });

    // PUT should update
    app.put(baseRoute + '/:id', function(req, res) {
      var result = validateRequest(req);
      if (result !== true) {
        res.send(result, 400);
        return;
      }

      that.update(req, db, req.params.id, function(err, object) {
        if (err) {
          throw err;
        } else {
          res.send(object);
        }
      });
    });

    // DELETE should remove
    app.del(baseRoute + '/:id', function(req, res) {
      that.remove(req, db, req.params.id, function(err) {
        if (err) {
          throw err;
        } else {
          // sends a "204 No Content" status code
          res.send();
        }
      });
    });
  }