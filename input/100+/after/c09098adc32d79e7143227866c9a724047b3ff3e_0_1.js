function (browserify) {
        browserify.register('.dust', function (body, file) {
            var name =  Math.floor(Math.random() * Math.pow(2,32)).toString(16);
            return 'var dust = require("dust"); ' + dust.compile(body, name) + ';module.exports = function(c, cb){dust.render("' + name + '", c, cb)}';
        });

        if (opts.dust != 'none') {
            var i, dustPath, dustVersion;
            for (i = 0; i < module.paths.length; i++) {
                dustPath = module.paths[i] + '/dustjs-linkedin/';
                if (fs.existsSync(dustPath + 'package.json')) {
                    dustVersion = require(dustPath + 'package.json').version;
                    break;
                }
            }

            if (!dustVersion)
                throw new Error('failed to load dustjs-linkedin (is dustjs-linkedin under node_modules?)');

            // hack to by-pass dust's dependency hack
            browserify.require('/dust-helpers', {file: __dirname + '/helpers/dust-helpers.js', target: '/dust-helpers'});
            browserify.alias('./dust-helpers', '/dust-helpers');
            browserify.require('/server', {file: __dirname + '/helpers/server.js', target: '/server'});
            browserify.alias('./server', '/server');
            
            browserify.require('dust', {file: dustPath + 'dist/dust-' + opts.dust + '-' + dustVersion + '.js', target: 'dust'});
        }
    }