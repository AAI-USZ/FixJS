function Controller(name, root) {
    var self = this;
    this.id = ++id;
    this._beforeFilters = [];
    this._afterFilters = [];
    this._actions = {};
    this._layout = null;
    this._buffer = {};

    ctlParams[this.id] = {};

    this.root = this.__dirname = root || app.root;

    if (!layoutsCache[name]) {
        // TODO: what if view engine name differs from extension?
        layoutsCache[name] = path.existsSync(app.root + '/app/views/layouts/' + name + '_layout.' + app.settings['view engine']) ? name : 'application';
    }

    ctlParams[this.id].baseLayout =
    ctlParams[this.id].layou = layoutsCache[name];

    // allow to disable layout by default for all views
    // using app.settings['view options'].layout = false
    if ((app.set('view options') || {}).layout === false) {
        ctlParams[this.id].baseLayout = false;
    }

    this.controllerName = name;
    this.controllerFile = Controller.index[this.root][name];

    if (!this.controllerFile) {
        throw new Error('Controller ' + name + ' is not defined');
    }

    // import outer context
    var outerContext = Controller.context[this.root][name];
    if (outerContext) {
        Object.keys(outerContext).forEach(function (key) {
            self[key] = outerContext[key].bind(self);
        });
    }

    // fix object inheritance broken when using as context
    Object.keys(Controller.prototype).forEach(function (method) {
        self[method] = Controller.prototype[method].bind(self);
    });

    this._filterParams = ['password'];

    if (!IS_NODE_04) {
        this.__defineGetter__('response',  function () { return this.ctx.res }.bind(this));
        this.__defineGetter__('res',       function () { return this.ctx.res }.bind(this));
        this.__defineGetter__('request',   function () { return this.ctx.req }.bind(this));
        this.__defineGetter__('req',       function () { return this.ctx.req }.bind(this));
        this.__defineGetter__('session',   function () { return this.ctx.req.session }.bind(this));
        this.__defineGetter__('params',    function () { return this.ctx.req.params }.bind(this));
        this.__defineGetter__('body',      function () { return this.ctx.req.body }.bind(this));
        this.__defineGetter__('next',      function () { return this.ctx.next }.bind(this));
        this.__defineGetter__('actionName',function () { return this.ctx.action }.bind(this));
        this.__defineGetter__('path_to',   function () { return this.ctx.paths }.bind(this));
    }

    this.t = T();
    this.t.locale = app.settings.defaultLocale || 'en';
    this.T = T;

    if (global.__cov && !this.__cov) {
        this.__cov = global.__cov;
    }

}