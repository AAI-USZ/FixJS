function (response) {
        var pageData = '';

        // keep track of the data you receive
        response.on('data', function (data) {
            pageData += data;
        });

        // finished? ok, write the data to a file
        response.on('end', function () {
            fs.writeFile(__dirname + '/../jslint/jslint.js', pageData.toString(), function (err) {
                if (err) {
                    throw err;
                }
                cb();
            });
        });
    }