function matchRoutes() {

          // Emit event to indicate starting
          var i, l, group = this.group(), // Enable parallel execution
            counter = 0;

          for (i = 0, l = routes.length; i < l; i = i + 1) {

            var keys = [],
              route = routes[i],
              template = null,
              block = "",
              cache = true,
              routeMethod = "",
              routeRegEx,
              j,
              paramLen,
              param,
              allPages = false;

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
              if (route.options.admin) {
                res.layout = "admin";
              }

              // Check to see if it requires admin access
              var isAdmin = req.session.user && req.session.user.isAdmin;
              if (route.options.admin && !isAdmin) {
                req.flash('error', req.t('You need to be an administrative user to view that page.'));
                res.statusCode = 401;
                res.redirect("/");
                group()();
                return;
              }

               // Check to see if it requires logged in user access
              var isUser = req.session.user && req.session.user.username;
              if (route.options.user && !isUser) {
                req.flash('error', req.t('You need to be logged in to view that page.'));
                res.statusCode = 401;
                res.redirect("/");
                group()();
                return;
              }

              // Debugging - only when logged in as admin user              
              calipso.silly("Module " + router.moduleName + " matched route: " + requestUrl.pathname + " / " + routeRegEx.toString() + " [" + res.routeMatched + "]");              
              
              // Lookup the template for this route
              if (route.options.template) {
                template = calipso.modules[router.moduleName].templates[route.options.template];
                if (!template && route.options.template) {
                  var err = new Error("The specified template: " + route.options.template + " does not exist in the module: " + router.modulePath);
                  return group()(err);
                } else {
                  calipso.silly("Using template: " + route.options.template + " for module: " + router.modulePath);
                }
              }

              // Set the block & cache settings
              block = route.options.block;

              // Set the object to hold the rendered blocks if it hasn't been created already
              if (!res.renderedBlocks) {
                res.renderedBlocks = new blocks.RenderedBlocks(calipso.cache);
              }

              // Copy over any params that make sense from the url
              req.moduleParams = {};
              for (j = 1, paramLen = captures.length; j < paramLen; j = j + 1) {
                var key = keys[j - 1],
                  val = typeof captures[j] === 'string'
                    ? decodeURIComponent(captures[j])
                    : captures[j];
                if (key) {
                  req.moduleParams[key] = val;
                } else {
                  // Comes from custom regex, no key
                  req.moduleParams["regex"] = val;
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
              calipso.lib._.extend(res.params,req.moduleParams);

              // Set if we should cache this block - do not cache by default, do not cache admins
              var cacheBlock = res.renderedBlocks.contentCache[block] = route.options.cache && !isAdmin;
              var cacheEnabled = calipso.config.get('performance:cache:enabled');
              if(block && cacheBlock && cacheEnabled) {

                //console.dir(req.moduleParams);
                var cacheKey = calipso.cache.getCacheKey('block',block,true);

                calipso.cache.check(cacheKey,function(err,isCached) {
                    if(isCached) {
                      // Set the block from the cache, set layout if needed
                      res.renderedBlocks.getCache(cacheKey,block,function(err,layout) {
                          if(layout)
                             res.layout = layout;
                          group()(err);
                      });
                    } else {
                      // Execute the module route function and cache the result
                      route.fn(req, res, template, block, group());
                    }
                });

              } else {

                route.fn(req, res, template, block, group());

              }

            }
          }
        }