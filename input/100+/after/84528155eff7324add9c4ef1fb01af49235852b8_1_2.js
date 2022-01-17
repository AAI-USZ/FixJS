function(opts) {
    var opts = opts || Player.DEFAULT_CONFIGURATION;
    this.inParent = opts.inParent;
    this.mode = (opts.mode != null) ? opts.mode : C.M_VIDEO;
    this.debug = opts.debug;
    this._initHandlers(); // TODO: make automatic
    this.canvas = document.getElementById(this.id);
    this.ctx = this.canvas.getContext("2d");
    this.state = Player.createState(this);
    this.state.zoom = opts.zoom || 1;
    this.controls = new Controls(this); // controls enabled by default
    this.info = new InfoBlock(this); // info enabled by default
    this.configureCnvs(opts.cnvs || Player.DEFAULT_CONFIGURATION.cnvs);
    this.configureMeta(opts.meta || Player.DEFAULT_CONFIGURATION.meta);
    this.subscribeEvents(this.canvas);
    this.stop();
    this._checkMode();
    // TODO: load some default information into player
    if (!Text.__buff) Text.__buff = Text._createBuffer(); // so it will be performed onload
    var mayBeUrl = this.canvas.getAttribute(Player.URL_ATTR);
    if (mayBeUrl) this.load(mayBeUrl/*,
                            this.canvas.getAttribute(Player.IMPORTER_ATTR)*/);
}