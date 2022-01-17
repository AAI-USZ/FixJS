function matchRoutes() {

          // Emit event to indicate starting
          var i, l, group = this.group();

          for (i = 0, l = routes.length; i < l; i = i + 1) {

            var keys = [],
              route = routes[i],
              templateFn = null,
              block = "",
              routeMethod = "",
              routeRegEx, j, paramLen, param, allPages = false;

            if (typeof route.path === "string") {
              routeMethod = route.path.split(" ")[0];
              routeRegEx = normalizePath(route.path.split(" ")[1], keys);
            } else {
              routeRegEx = route.path;
              allPages = true; // Is a regex
            }

            var captures = requestUrl.pathname.match(routeRegEx);

            if (captures && (!routeMethod || req.method === routeMethod)) {

              // Check to see if we matched a non /.*/ route to flag a 404 later
              res.routeMatched = !allPages || res.routeMatched;

              // If admin, then set the route
              if (route.admin) {
                res.layout = "admin";
                if(!route.permit){
                  calipso.debug("Route has admin only but no permit is defined!");
                  route.permit = calipso.permission.Helper.hasPermission("admin");
                }
              }

              // TODO 
              var isAdmin = req.session.user && req.session.user.isAdmin;

              // Check to see if it requires logged in user access
              if (route.permit) {

                var permit = route.permitFn.check(req);

                if (typeof permit !== "object") permit = {
                  allow: false,
                  msg: 'You don\'t have the appropriate permissions to view that page.'
                };
                if (!permit.allow) {
                  if (!allPages) {
                    if (!req.cookies.logout) {
                      req.flash('error', req.t(permit.msg));
                      res.statusCode = 401;
                    }
                    res.redirect("/");
                    return group()();
                  } else {
                    // Simply ignore silently
                    return group()();
                  }
                }
              }

              // Debugging - only when logged in as admin user
              // calipso.silly("Module " + router.moduleName + " matched route: " + requestUrl.pathname + " / " + routeRegEx.toString() + " [" + res.routeMatched + "]");
              // Lookup the template for this route
              if (route.template) {
                templateFn = calipso.modules[self.moduleName].templates[route.template];
                if (!templateFn && route.template) {
                  var err = new Error("The specified template: " + route.template + " does not exist in the module: " + self.modulePath);
                  return group()(err);
                } else {
                  calipso.silly("Using template: " + route.template + " for module: " + self.modulePath);
                }
                route.templateFn = templateFn;
              }

              // Set the object to hold the rendered blocks if it hasn't been created already
              if (!res.renderedBlocks) {
                res.renderedBlocks = new blocks.RenderedBlocks(calipso.cacheService);
              }

              // Copy over any params that make sense from the url
              req.moduleParams = {};
              for (j = 1, paramLen = captures.length; j < paramLen; j = j + 1) {
                var key = keys[j - 1],
                  val = typeof captures[j] === 'string' ? decodeURIComponent(captures[j]) : captures[j];
                if (key) {
                  req.moduleParams[key] = val;
                } else {
                  // Comes from custom regex, no key
                  // req.moduleParams["regex"] = val;
                }
              }

              // Convert any url parameters if we are not a .* match
              if (requestUrl.query && !allPages) {
                for (param in requestUrl.query) {
                  if (requestUrl.query.hasOwnProperty(param)) {
                    req.moduleParams[param] = requestUrl.query[param];
                  }
                }
              }

              // Store the params for use outside the router
              res.params = res.params || {};
              calipso.lib._.extend(res.params, req.moduleParams);

              // Set if we should cache this block - do not cache by default, do not cache admins
              var cacheBlock = res.renderedBlocks.contentCache[block] = route.cache && !isAdmin;
              var cacheEnabled = calipso.config.get('performance:cache:enabled');

              if (route.block && cacheBlock && cacheEnabled) {

                var cacheKey = calipso.cacheService.getCacheKey(['block', route.block], res.params);

                calipso.cacheService.check(cacheKey, function(err, isCached) {
                  if (isCached) {
                    // Set the block from the cache, set layout if needed
                    res.renderedBlocks.getCache(cacheKey, route.block, function(err, layout) {
                      if (layout) res.layout = layout;
                      group()(err);
                    });
                  } else {

                    // Execute the module route function and cache the result
                    self.routeFn(req, res, route, group());

                  }
                });

              } else {

                self.routeFn(req, res, route, group());

              }

            }

          }

        }