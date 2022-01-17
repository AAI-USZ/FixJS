function(appModule) {
    var appExports = merge(appModule.exports, EventEmitter.prototype)
      , view = new View(this._libraries, appExports)
      , options = this.options
      , session, store;

    view._derbyOptions = options;
    view._appFilename = appModule.filename;
    function setStore(_store) {
      autoRefresh(_store, options, view);
      if (session != null) session._setStore(_store);
      return store = _store;
    }

    // Expose methods on the application module

    function Page(model, res) {
      this.model = model;
      this._res = res;
    }
    Page.prototype.render = function(ns, ctx, status) {
      view.render(this._res, this.model, ns, ctx, status);
    };

    function createPage(req, res) {
      var model = req.model || store.createModel();
      return new Page(model, res);
    }
    function onRoute(callback, page, params, next, isTransitional) {
      if (isTransitional) {
        callback(page.model, params, next);
      } else {
        callback(page, page.model, params, next);
      }
    }
    appExports.routes = tracks.setup(appExports, createPage, onRoute);

    appExports._setStore = setStore;
    appExports.view = view;
    appExports.ready = function() {};
    appExports.createStore = function(options) {
      return setStore(racer.createStore(options));
    };
    appExports.session = function() {
      return session = racer.session(store);
    };
    appExports.render = function(res, model, ns, ctx, status) {
      return view.render(res, model, ns, ctx, status);
    };

    // Render immediately upon creating the app so that files
    // will be cached for the first render
    process.nextTick(function() {
      view.render();
    });
    return appExports;
  }