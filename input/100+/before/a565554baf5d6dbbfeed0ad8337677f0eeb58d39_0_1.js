function(command) { // {{{
    var args = [];
    for ( var k in arguments )
        args.push(arguments[k]);
    args[args.length-1] = ":" + args[args.length-1];

    // Remove the command
    args.shift();

    if ( this.opt.debug )
        util.log('SEND: ' + command + " " + args.join(" "));

    if ( ! this.conn.requestedDisconnect ) {
        this.conn.write(command + " " + args.join(" ") + "\r\n");
    }
}; // }}}