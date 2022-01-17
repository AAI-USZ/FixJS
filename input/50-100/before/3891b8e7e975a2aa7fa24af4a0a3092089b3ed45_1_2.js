function (cb) {
    'use strict';
    fs.mkdir("jslint");
    callback = cb;
    http.get(options, processData);
}