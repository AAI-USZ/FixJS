function(req, res) {
    var file = req.params[0];
    if (!file) {
        file = 'index.html';
    }
    console.log('Serving Results..'.white, file.yellow);

    var p = path.join(path.dirname(lastResult), file);
    if (exists(p)) {
        console.log('File Path:'.white, p.yellow);
        fs.readFile(p, 'utf8', function(err, str) {
            res.contentType('.html');
            res.send(str);
        });
    } else {
        console.log('Trying to load results with no content, redirecting to /'.magenta);
        res.redirect('/');
    }
}