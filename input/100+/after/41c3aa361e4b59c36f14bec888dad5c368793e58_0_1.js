function() {
          var currentPath       = location.hash || '#!/',
              pollingAllowed    = true,
              matchedRouteEntry = null,
              request           = null,
              response          = null;

          if (pollingAllowed && (currentPath !== previousPath)) {

            // In case of older browsers (IE6/7), where we use hash polling instead
            // of hash change events, polling needs to be terminated when we are
            // still on the same page, so unneccessary continous calls to the same
            // controller/action & re-renderring is avoided.
            pollingAllowed = false;
            matchedRouteEntry = getRouteFor(currentPath);

            if (!matchedRouteEntry) {
              // The route has not been recognized and we need to simulate a
              // 404 response. The 404 template can be defined just as any other.
              containerElement.empty().html(
                renderTemplate({ options : { template: '404', cache: true } })
              );
            } else {
              request = {
                path           : currentPath,
                previousPath   : previousPath,
                params         : getParams(currentPath),
                previousParams : previousParams,
                controller     : matchedRouteEntry.controller,
                action         : matchedRouteEntry.action || DEFAULT_ACTION_NAME
              };

              // Run the `beforeFilter` callbacks defined in controller and on top
              // level. Note that the response doesn't exist yet so it is not passed here.
              runCallbacks('beforeFilter', request);

              // Fetch the response by calling the respective route's defined
              // controller and action and passing the request object formed before.
              response = getControllerActionResponseFor(request);

              // The `afterFilter` callback might be useful, if we are not concerned
              // whether the controller action responded at all, but still need
              // to do after controller processing.
              runCallbacks('afterFilter', request, response);

              // If the controller action responed to hash parameters with data,
              // we can proceed to callbacks and rendering.
              if (response) {

                // Some controller actions have no need of a rendered response.
                // Those can be popups for instance, triggered by hash changes.
                if (response.options.renderNothing) {
                  spaLog('(spa) template bypassed');
                } else {
                  // The `beforeRender` callback might be useful for cleaning up the
                  // previous view or detaching some events.
                  runCallbacks('beforeRender', request, response);

                  // Response object should give information which template was used.
                  response.options.template = getTemplateNameFor(request, response);

                  // Finally the template is rendered and the data and options given
                  // from the action are passed into. The rendered template immediately
                  // replaces current contents of the app container.
                  containerElement.empty().html(renderTemplate(response));

                  // The `afterRender` callback is usually the place where DOM events
                  // should be attached to the newly rendered html.
                  runCallbacks('afterRender', request, response);

                  // If the `preloadPaths` property is specified in the controller response
                  // we will preload all paths in the rendered container, by memoizing the
                  // controller responses as well the rendered templates, but without callbacks.
                  // The list of all preloaded paths is attached to the response, for
                  // possible later use.
                  if (response.options.preloadPaths) {
                    response.preloadedPaths = preloadPossiblePaths(containerElement);
                  }

                  // We must ensure we are scrolling to the page top,
                  // to simulate a well known page load behaviour
                  $("body,html,document").scrollTop(0);
                }

                // The response returned can ask for the app to redirect the page,
                // most likely to another SPA hash bang path, but also to another url
                // via the returned `redirectTo` property.
                //
                // Since this executes late, after rendering, it can be combined
                // with the `renderNothing` option to avoid any rendering before redirecting.
                if (response.options.redirectTo) {
                  redirectToPath(response.options.redirectTo);
                }

              } else {
                // The route has been recognized, but the controller returned an
                // empty response probably the object does not exist in the
                // payload (like wrong id).
                containerElement.empty().html(
                  renderTemplate({ options : { template: '404', cache: true } })
                );
              }

              // Previous hash and exploded params out of it are kept
              // so they can be given in the next request's hash, as a
              // context aid.
              previousParams = request.params;
              previousPath   = currentPath;

              // The handler of the route is finishing and polling is allowed
              // again - influences only older browsers.
              pollingAllowed = true;
            }
          }
        }