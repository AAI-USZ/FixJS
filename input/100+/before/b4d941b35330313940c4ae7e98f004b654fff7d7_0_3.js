function Shaker (options) {
    this._core = new ShakerCore(options);

    var shaker = this._core.getShakerConfig(),
        cwd = process.cwd();

    this._task = Shaker.DEFAULT_TASK;
    if (shaker.task) { // Task to run when compiling assets
        this._task = shaker.task === 'local' ? 'write' : shaker.task;
    }
    this._compiled_dir = shaker.compiled_dir || Shaker.COMPILED_DIR;
    this._images = shaker.images !== undefined ? shaker.images : false; // Deploy images
    this._parallel = shaker.parallel !== undefined ? shaker.parallel : 20; // How many tasks the async queue runs
    this._delay = shaker.delay !== undefined ? shaker.delay : 0; // Add some network delay for slow connections
    this._lint = shaker.lint !== undefined ? shaker.lint : true; // lint or not
    this._minify = shaker.minify !== undefined ? shaker.minify : true; // Uglify or not
    this._config = shaker.config || {}; // Config object passed through to task
    this._config.root = this._core.getStaticRoot();

    this._registry = new gear.Registry({dirname: path.resolve(__dirname, '../', 'node_modules', 'gear-lib', 'lib')});

    if (path.existsSync(Shaker.TASKS_DIR)) {    // Load more tasks
        this._registry.load({dirname: Shaker.TASKS_DIR});
    }
    if (shaker.module) {
        this._registry.load({module: shaker.module});
    }
}