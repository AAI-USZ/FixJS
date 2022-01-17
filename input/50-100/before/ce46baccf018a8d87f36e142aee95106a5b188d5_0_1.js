function (file) {
            var type = mime.lookup(file);

            if (type === 'application/javascript') {
                js.push(file);
            } else if (type === 'text/css') {
                css.push(file);
            }
        }