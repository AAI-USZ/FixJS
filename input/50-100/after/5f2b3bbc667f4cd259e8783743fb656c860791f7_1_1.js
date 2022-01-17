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
        for (var i = forth.stackTrace.length-1;
             i >= 0;
             i--)
            err += '\nin '+forth.stackTrace[i];
        throw err;
    }
}