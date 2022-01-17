function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    app.use(express.bodyParser(
      {
        uploadDir: ((options.upload.method == "direct") ? options.upload.paths.temp : null)
      }
    ));

    app.use(express.methodOverride());
    app.use(express.cookieParser(options.sessionKey));

    if  (options.redis) {
        if (app.settings.env == 'production') {
            var conf = {
                h: false, //Host
                t: false, //Port
                d: false, //Db
                s: false  //Pass
            }
            if (process.env.REDISTOGO_URL) {
                var url = require('url'),
                    redisUrl = url.parse(process.env.REDISTOGO_URL),
                    redisAuth = redisUrl.auth.split(':');
                conf.h = redisUrl.hostname;
                conf.t = redisUrl.port;
                conf.d = redisAuth[0];
                conf.s = redisAuth[1];
            } else if (options.redis.host) {
                conf.h = options.redis.host;
                conf.t = options.redis.port;
                conf.d = options.redis.db;
                conf.s = options.redis.pass;
            }
            app.use(express.session({
                store: new RedisStore({
                    host : conf.h,
                    port : conf.t,
                    db   : conf.d,
                    pass : conf.s
                })
            }));
        } else {
            if (options.redis && options.redis.host) {
                app.use(express.session({
                    store: new RedisStore({
                        host : options.redis.host,
                        port : options.redis.port,
                        db   : options.redis.db,
                        pass : options.redis.pass
                    })
                }));
            } else {
                app.use(express.session({ store: new RedisStore }));
            }
        }
    } else {
        app.use(express.session());
    }
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
}