function (req, res, next) {
        prefix = prefix.replace(/(\/|\\)?$/g, '');
        var url = require('url').parse(req.url).pathname;
        if (url !== prefix + '/client.js' && url !== prefix + '/api') return next();

        if (url === prefix + '/api') {
            if (req.query.id == id.toString()) {
                sendAll = send(res);
                return;
            } else {
                return res.json(id);
            }
        }

        var client = [
            '(function(){',
            'if(typeof jQuery === "undefined") throw new Error("You must install jQuery to use staylive");',
            'var old = null;',
            'function test(){setTimeout(function(){',
            'jQuery.ajax("' + prefix  + '/api?id="+old, {success: function(data){',
            'if(old === null) old = data;',
            'else if (old !== data) location.reload();',
            '}, }).always(test);},10);',
            '}',
            'test();',
            '}())'
        ];

        if (url === prefix + '/client.js') {
            res.contentType('client.js');
            return res.send(client.join('\n'));
        }
        next();
    }