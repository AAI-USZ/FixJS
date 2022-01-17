function (files, syncWrap) {
        var js = [],
            css = [];

        files.forEach(function (file) {
            var type = mime.lookup(file);

            if (type === 'application/javascript') {
                js.push(syncWrap ? {name:file, sync:true} : file);
            } else if (type === 'text/css') {
                css.push(syncWrap ? {name:file, sync:true} : file);
            }
        });

        return {'js': js, 'css': css};
    }