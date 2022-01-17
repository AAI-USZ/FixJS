function(opts){
    var opts = opts || {};

    // initialize core mml_store
    var mml_store  = new grainstore.MMLStore(opts.redis, opts.grainstore);

    // initialize render cache 60 seconds TTL
    var render_cache = new RenderCache(60000, mml_store);

    // optional log format
    var log_format = opts.log_format || '[:req[X-Real-IP] > :req[Host] @ :date] \033[90m:method\033[0m \033[36m:url\033[0m \033[90m:status :response-time ms -> :res[Content-Type]\033[0m'

    // initialize express server
    var app = express.createServer();
    app.enable('jsonp callback');
    app.use(express.bodyParser());
    app.use(express.logger({
        // Allowing for unbuffered logging is mainly
        // used to avoid hanging during unit testing.
        // TODO: provide an explicit teardown function instead,
        //       releasing any event handler or timer set by
        //       this component.
        buffer: !opts.unbuffered_logging,
        format: log_format
    }));

    //TODO: extract server config to a function
    // take in base url and base req2params from opts or throw exception
    if (!_.isString(opts.base_url) || !_.isFunction(opts.req2params)) throw new Error("Must initialise Windshaft with a base URL and req2params function");

    // Extend windshaft with all the elements of the options object
    _.extend(app, opts);

    // set default before/after filters if not set in opts object
    // filters can be used for custom authentication, caching, logging etc
    _.defaults(app, {
        // called pre tile render right at the start of the call
        beforeTileRender: function(req, res, callback) {
            callback(null);
        },
        // called immediately after the tile render. Called with tile output
        afterTileRender: function(req, res, tile, headers, callback) {
            callback(null, tile, headers);
        },
        // called after a map style is changed or deleted
        afterStateChange: function(req, data, callback) {
            callback(null, data);
        }
    });


    /*
    * Routing from here
    */

    // simple testable route
    app.get('/', function(req, res){
        res.send("JOHN RAMBO");
    });


    // Retrieve the Carto style for a given map.
    // Returns styles stored in grainstore for a given params combination
    // Returns default if no style stored
    app.get(app.base_url + '/style', function(req, res){
        var mml_builder;

        Step(
            function(){
                app.req2params(req, this);
            },
            function(err, data){
                if (err) throw err;

                mml_builder = mml_store.mml_builder(req.params);
                mml_builder.getStyle(this);
            },
            function(err, data){
                if (err){
                    res.send(err, 500);
                } else {
                    res.send({style: data.style}, 200);
                }
            }
        );
    });


    // Set new map style
    // Requires a 'style' parameter containing carto (mapbox.com/carto)
    //
    // 1. If carto is invalid, respond with error messages + status
    // 2. If carto is valid, save it, reset the render pool and return 200
    //
    // Triggers state change filter
    app.post(app.base_url + '/style', function(req, res){
        var mml_builder;

        Step(
            function(){
                app.req2params(req, this);
            },
            function(err, data){
                if (err) throw err;
                if (_.isUndefined(req.body) || _.isUndefined(req.body.style)) {
                    res.send({error: 'must send style information'}, 400);
                } else {
                    mml_builder = mml_store.mml_builder(req.params);
                    mml_builder.setStyle(req.body.style, this);
                }
            },
            function(err, data) {
                if (err) throw err;
                var param = req.params;
                app.afterStateChange(req, data, this);
            },
            function(err, data){
                if (err){
                    res.send(err.message.split('\n'), 500);
                } else {
                    render_cache.reset(req);
                    res.send(200);
                }
            }
        );
    });


    // Delete Map Style
    // Triggers state change filter
    app.delete(app.base_url + '/style', function(req, res){
        var mml_builder;

        Step(
            function(){
                app.req2params(req, this);
            },
            function(err, data){
                if (err) throw err;
                mml_builder = mml_store.mml_builder(req.params);
                mml_builder.delStyle(this);
            },
            function(err, data) {
                if (err) throw err;
                app.afterStateChange(req, data, this);
            },
            function(err, data){
                if (err){
                    res.send(err.message, 500);
                } else {
                    render_cache.reset(req);
                    res.send(200);
                }
            }
        );
    });


    // Gets a tile for a given set of tile ZXY coords. (OSM style)
    // Call with .png for images, or .grid.json for UTFGrid tiles
    //
    // query string arguments:
    //
    // * sql - use SQL to filter displayed results or perform operations pre-render
    // * style - assign a per tile style using carto
    // * interactivity - specify which columns to represent in the UTFGrid
    // * cache_buster - specify to ensure a new renderer is used
    // * geom_type - specify default style to use if no style present
    //
    // Triggers beforeTileRender and afterTileRender render filters
    app.get(app.base_url + '/:z/:x/:y.*', function(req, res){

        // Enable CORS access by web browsers if set
        if(opts.enable_cors){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
        }

        // strip format from end of url and attach to params
        req.params.format = req.params['0'];
        delete req.params['0'];

        // Wrap SQL requests in mapnik format if sent
        if(req.query.sql && req.query.sql !== '') {
            req.query.sql = "(" + req.query.sql + ") as cdbq";
        }

        Step(
            function(){
                app.req2params(req, this);
            },
            function(err) {
                if (err) throw err;
                app.beforeTileRender(req, res, this);
            },
            function(err, data){
                if (err) throw err;
                render_cache.getRenderer(req, this);
            },
            function(err, renderer) {
                if (err) throw err;
                var my_func = (req.params.format === 'grid.json') ? 'getGrid' : 'getTile';
                renderer[my_func].call(renderer, req.params.z, req.params.x, req.params.y, this);
            },
            function(err, tile, headers) {
                if (err) throw err;
                app.afterTileRender(req, res, tile, headers, this);
            },
            function(err, tile, headers) {
                if (err){
                    console.log("[TILE RENDER ERROR]\n" + err);
                    res.send(err, 500);
                } else {
                    res.send(tile, headers, 200);
                }
            }
        );
    });


    return app;
}