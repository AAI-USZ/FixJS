function addTimeout(timeout, channel, callback) {
    var runner = setTimeout(function() {
        var error = util.createErrorResponse("TimeoutExpired", "Timeout after " + timeout + "ms");
        callback(error);
        channel.close();
    }, timeout);

    //Clear the timeout when the channel is closed
    channel.on("closing", function() {
        clearTimeout(runner);
    });
}