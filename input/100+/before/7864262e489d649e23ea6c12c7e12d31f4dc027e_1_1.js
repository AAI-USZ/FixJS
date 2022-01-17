function(o) {
        var root = o.rootPath;

        if (!path.existsSync(root)) {
            throw('Root path does not exist');
        }
        
        return function(req, res, next) {
            //Set the filter type for the seed fetch
            var filt = req.query.filter ? req.query.filter : 'min',
                
                //Stamp the seed config and version
                seedStamp = '\n\n/* Stamping Seed File */\n' + 
                'YUI.applyConfig({\n' + 
                '   comboBase: "http://' + req.headers.host + '/yui?",\n' + 
                '   base: "http://' + req.headers.host + '/build/",\n' + 
                '   combine: true,\n' + 
                '   root: "",\n' + 
                '   filter: "' + filt + '"\n' + 
                '});\n' + 
                '\nYUI.version = "yui-local";';
            
            //Reload seed file on each request
            var f = 'yui/yui-min.js';
            switch (filt) {
                case 'raw':
                    f = 'yui/yui.js';
                    break;
                case 'debug':
                    f = 'yui/yui-debug.js';
                    break;
            }

            var seed = fs.readFileSync(path.join(root, f), 'utf8');

            //Concat the file with the stamp
            res.body = seed + seedStamp;
            //Set the content type
            res.contentType('.js');
            //Send to next route
            next();

        }
    }