function (resource) {
    var entity = resource._resource.toLowerCase(),
        param = options.param || ':id',
        pluralEntity = inflect(entity);

    //
    // Check if resource has any children
    // If a resource has children, we'll need to recursively
    // call the extendRouter method, prefixing the current resource
    // as the base path
    //
    if (resource._children && resource._children.length > 0) {
      var childResource = resourceful.resources[resource._children[0]],
          clonedOptions = utile.clone(options);
      //
      // Remark: Create a new instance of options since we don't want,
      // to modify the reference scope inside this extendRouter call
      //
      clonedOptions.parent = resource;
      //
      // Extend the router to expose child resource as base path
      //
      _extend(router, childResource, clonedOptions, respond);

      //
      // Also, extend the router to expose child resource as child of parent
      //
      clonedOptions.prefix = '/' + pluralEntity + '/:id/';
      _extend(router, childResource, clonedOptions, respond);
    }

    //
    // If we are not in strict mode, then extend the router with,
    // some potentially helpful non-restful routes
    //
    if (!options.strict) {
      _extendWithNonStrictRoutes(router, resource, options, respond);
    }

    //
    // Scope all routes under /:resource
    //
    router.path(options.prefix + '/' + pluralEntity, function () {
      //
      // Bind resource.all ( show all ) to GET /:resource
      //
      this.get(function () {
        var res = this.res,
            req = this.req;

        resource.all(function (err, results) {
          return err
            ? respond(req, res, 500, err)
            : respond(req, res, 200, pluralEntity, results);
        });
      });

      //
      // Bind POST /:resource to resource.create()
      //
      this.post(function () {
        var res    = this.res,
            req    = this.req;

        if (!options.strict) {
          preprocessRequest(req, resource);
        }

        resource.create(req.body, function (err, result) {
          var status = 201;

          if (err) {
            status = 500;
            if (typeof err === "object") { // && key.valid === false
              status = 422;
            }
          }

          return err
            ? respond(req, res, status, err)
            : respond(req, res, status, entity, result);
        });
      });

      //
      // Bind /:resource/:param path
      //
      this.path('/' + param, function () {

        //
        // If we are going to expose Resource methods to the router interface
        //
        if (options.exposeMethods) {
          //
          // Find every function on the resource,
          // which has the "remote" property set to "true"
          //
          for (var m in resource) {
            if(typeof resource[m] === "function" && resource[m].remote === true) {
              var self = this;

              //
              // For every function we intent to expose remotely,
              // bind a GET and POST route to the method
              //
              (function(m){
                self.path('/' + m.toLowerCase(), function(){
                   this.get(function (_id) {
                     var req = this.req,
                         res = this.res;
                    resource[m](_id, req.body, function(err, result){
                       return err
                         ? respond(req, res, 500, err)
                         : respond(req, res, 200, 'result', result);
                     });
                   });
                   this.post(function (_id) {
                     var req = this.req,
                         res = this.res;
                     resource[m](_id, req.body, function(err, result){
                       return err
                         ? respond(req, res, 500, err)
                         : respond(req, res, 200, 'result', result);
                     });
                   });
                });
              })(m)
            }
          }
        }

        //
        // Bind POST /:resource/:id to resource.create(_id)
        //
        this.post(function (_id, childID) {
          var res    = this.res,
              req    = this.req;

          if (!options.strict) {
            preprocessRequest(req, resource);
          }

          //
          // Remark: We need to reserve the id "new" in order to make resource-routing work properly.
          // I don't agree with this, but I'm not aware of a better solution solution.
          //
          // Based on research, both Rails and Express follow this same convention,
          // so we might as well try to conform to that unless there is a better solution.
          //

          //
          // If the _id is "new", then check the req.body to see,
          // if there is a valid "_id" in the body
          //
          if (_id === "new") {
            if(typeof req.body.id !== 'undefined' && req.body.id !== "new") {
              //
              // Everything is OK. We hit /:id/
              //
            } else {
              return respond(req, res, 500);
            }
          } else {
            req.body.id = _id;
          }

          //
          // If a parent has been passed in and we have a child id,
          // we need to first fetch the parent, then create the child,
          // in the context of that parent
          //
          if (options.parent && typeof childID !== 'undefined') {
            req.body.id = childID;
            options.parent.get(_id, function(err, album) {
              album['create' + resource._resource](req.body, function (err, result) {
                return err
                  ? respond(req, res, 500, err)
                  : respond(req, res, 201, entity, result);
              });
            });
          } else {
            resource.create(req.body, function (err, result) {
              return err
                ? respond(req, res, 500, err)
                : respond(req, res, 201, entity, result);
            });
          }
        });

        //
        // Bind GET /:resource/:id to resource.get
        //
        this.get(function (_id, childID) {
          var req = this.req,
              res = this.res;

          // Remark: We need to reserve the id "new" in order to make resource-routing work properly.
          // I don't agree with this, but I'm not aware of a better solution solution.
          //
          // Based on research, both Rails and Express follow this same convention,
          // so we might as well try to conform to that unless there is a better solution.
          //
          if (_id === "new") {
            return respond(req, res, 500);
          }

          //
          // Remark: If a parent has been passed in and we have a child id,
          // append together the child resource, parent resource, parent id, and child id,
          // to create the unique key to fetch
          //
          if (options.parent && typeof childID !== 'undefined') {
            _id = options.parent._resource.toLowerCase() + '/' + _id + '/' + childID;
          }
          resource.get(_id, function (err, result) {
            if (err) {
              res.writeHead(404);
              res.end();
              return;
            }
            respond(req, res, 200, entity, result);
          });
        });

        //
        // Bind DELETE /:resource/:id to resource.destroy
        //
        this.delete(function (_id, childID) {
          var req = this.req,
              res = this.res;

          if (options.parent && typeof childID !== 'undefined') {
            _id = options.parent._resource.toLowerCase() + '/' + _id + '/' + childID;
          }

          resource.destroy(_id, function (err, result) {
            return err
              ? respond(req, res, 500, err)
              : respond(req, res, 204);
          });
        });

        //
        // Bind PUT /:resource/:id to resource.update
        //
        this.put(function (_id, childID) {
          var req = this.req,
              res = this.res;
          if (!options.strict) {
            preprocessRequest(req, resource);
          }

          if (options.parent && typeof childID !== 'undefined') {
            _id = options.parent._resource.toLowerCase() + '/' + _id + '/' + childID;
          }

          resource.update(_id, req.body, function (err, result) {
            var status = 204;
            if (err) {
              status = 500;
              if (typeof err === "object") { // && key.valid === false
                status = 422;
              }
            }

            return err
              ? respond(req, res, status, err)
              : respond(req, res, status);
          });
        });
      });
    });
  }