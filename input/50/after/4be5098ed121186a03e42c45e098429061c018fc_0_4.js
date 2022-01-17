function addGlobalErrorHandler() {
    process.on('uncaughtException', function (err) {
        var su = require("swarmutil");
        su.perror(err);
    });
}