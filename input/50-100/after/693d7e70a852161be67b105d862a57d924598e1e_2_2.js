function (cb) {
    'use strict';
    try {
        fs.mkdirSync(__dirname + "/../jslint");
    } catch (e) {
        if (e.code === 'EACCES') {
            console.log("Must be root");
            console.log("Try:\n\tsudo jslint --update");
            process.exit(1);
        } else if (e.code !== 'EEXIST') {
            throw e;
        }
    }
    http.get(options, processData(cb));
}