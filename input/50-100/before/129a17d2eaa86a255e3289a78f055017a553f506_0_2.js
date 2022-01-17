function(dir, mode){
    mode = mode || '0777';

    var paths = dir.split('/'),
        prev = '',
        cur;

    for (var i = 0, n = paths.length; i < n; i += 1) {
        cur = path.join(prev, paths[i]);
        if(! path.existsSync(cur) ){
            fs.mkdirSync(cur, mode);
        }
        prev = cur;
    }

}