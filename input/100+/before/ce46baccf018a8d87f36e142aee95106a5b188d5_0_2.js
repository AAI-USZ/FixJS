function (files) {
        var js = [],
            css = [];

        files.forEach(function (file) {
            var type = mime.lookup(file);

            if (type === 'application/javascript') {
                js.push(file);
            } else if (type === 'text/css') {
                css.push(file);
            }
        });

        return {'js': js, 'css': css};
    }