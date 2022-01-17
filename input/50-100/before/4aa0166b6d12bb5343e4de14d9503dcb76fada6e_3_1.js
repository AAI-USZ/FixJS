function () {
        var message = Array.prototype.slice.call(arguments, 1);
        message.unshift("ERR!".red.inverse);
        stdout.apply(this, message);
        process.exit(arguments[0]);
    }