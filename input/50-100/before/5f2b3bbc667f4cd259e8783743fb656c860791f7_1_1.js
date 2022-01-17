function(s) {
    var token = forth.source.readToken();
    if (token == null) {
        forth.running = false;
        return;
    }
    try {
        forth.runToken(token);
    } catch (err) {
        forth.running = false;
        for (var i = 0; i < forth.callStack.length; i++)
            err += '\nin '+forth.callStack.pop().name;
        throw err;
    }
}