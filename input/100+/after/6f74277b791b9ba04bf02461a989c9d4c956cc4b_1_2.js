function(argv) {
    var subapp_prefix = 'app!';

    process.on('uncaughtException', function(e){
      _.each(childProcesses, function(p, idx){
        p.kill();
      });
      console.error(e.stack);
      process.exit();
    });

    var fs = require('fs');
    var path = require('path');
    var spawn = require('child_process').spawn;
    var httpProxy = require('http-proxy');

    var meteors = collectSubapps();
    function collectSubapps(){
      var nMeteors = 0;
      var meteors = {};
      _.each(fs.readdirSync(process.cwd()),function(p) {
        if (p[0] !== '.' && path.existsSync(path.join(p,'.meteor'))) {
          var dir = p;
          var name = p;
          if(p !== 'root'){
            if(argv.prefix)
              name = argv.prefix + '-' + p;

            name = subapp_prefix + name;
          }

          meteors[name] = {
            name: name,
            port: 3000+4*nMeteors+1,
            dir: dir
          }
          nMeteors++;
        }
      });

      return meteors;
    }

    console.log('Initializing subapps...', meteors);

    var childProcesses = [];
    _.each(meteors,function(app, appName) {
      var env = _.clone(process.env);
      env.METEOR_SUBAPP_PREFIX = subapp_prefix;
      var p = spawn('meteor',['--port',app.port],{cwd: app.dir, env: env});
      childProcesses.push(p);

      p.stdout.on('data',function(data) {
        console.log(appName+': '+data);
      });
      p.stderr.on('data',function(data) {
        console.error(appName+': '+data);
      });
    });


    function nameToApp(name){
      if(meteors.hasOwnProperty(name)){
        return meteors[name];
      }
    }

    function getAppNameFromPath(p){
      var parts = p.split('/');
      return parts[1];
    }

    function getAppForReq(req){
      var app = nameToApp(getAppNameFromPath(req.url));
      if(!app && typeof req.headers.referer !== 'undefined'){
        var refpath = require('url').parse(req.headers.referer).pathname;
        app = nameToApp(getAppNameFromPath(refpath));
      }
      
      if(!app)
        app = nameToApp('root');

      return app;
    }

    function stripAppFromUrl(url, appName){
      //  The trailing slash in the check is important so that files such as
      //  /root.css still work correctly.
      if(url.indexOf('/' + appName + '/') === 0)
        return url.slice(appName.length + 1);
      return url;
    }

    var p = httpProxy.createServer(function(req,res,proxy) {
      var app = getAppForReq(req);
      req.url = stripAppFromUrl(req.url, app.name);
      proxy.proxyRequest(req, res, {host: '127.0.0.1', port: app.port});
    });

    p.on('upgrade', function(req, socket, head) {
      var app = getAppForReq(req);
      p.proxy.proxyWebSocketRequest(req, socket, head, {host: '127.0.0.1', port: app.port});
    });
    p.listen(3000,function(){});

  }