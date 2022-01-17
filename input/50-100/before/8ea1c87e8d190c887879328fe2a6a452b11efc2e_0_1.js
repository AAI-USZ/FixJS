function (form) {
            var req_data = require('url').parse(req.url, 1).query;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<h1>Success!</h1>');
            res.end('<pre>' + sys.inspect(form.data) + '</pre>');
        }