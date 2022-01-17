function (code, message, exit) {
        var message = Array.prototype.slice.call(arguments, 1);
        message.unshift("ERR!".red.inverse);
        stdout.apply(this, message);
        if (exit == null || exit == true) {
            process.exit(arguments[0]);
        }
    }