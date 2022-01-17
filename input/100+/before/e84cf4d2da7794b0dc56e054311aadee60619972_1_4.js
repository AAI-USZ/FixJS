function(req, res) {

    var file = req.params[0];
    var ext = path.extname(file);
    var cover = false;
    var doAppend = false;

    var item = file.split('/');

    if (mods[item[2]] && ext === '.js') {
        cover = true;
        if (item[2].indexOf('selector') > -1) {
            cover = false;
        }
    }
    

    if (cover) {
        serveCoverage(item[2], res);
    } else {

        //Check Build
        var p = path.join(process.cwd(), '../../', file);
        //Check src
        if (!path.existsSync(p)) {
            var p = path.join(process.cwd(), '../', file);
        }
        //Check ./tests/
        if (!path.existsSync(p)) {
            if (path.extname(p).indexOf('htm') > 0) {
                doAppend = true;
            }
            var p = path.join(base, file);
        }
        if (!path.existsSync(p)) {
            res.send(404);
            //res.redirect('/');
            return;
        }
        fs.readFile(p, function(err, str) {
            res.contentType(ext);
            if (doAppend) {
                str += append;
            }
            res.send(str);
        });
    }
}