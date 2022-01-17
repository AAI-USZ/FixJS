function(code, msg, func) {
    var uuid = '';
    var messages;

    if (this.disconnected) {
        return;
    }
    // Check to see if DSN object was passed in
    if (typeof msg === 'object' && msg.constructor.name === 'DSN') {
        // Override
        code = msg.code;
        msg = msg.reply;
    }
    if (!(Array.isArray(msg))) {
        // msg not an array, make it so:
        messages = [ '' + msg ];
    } else {
        // copy
        messages = msg.slice();
    }

    if (code >= 400 && this.deny_includes_uuid) {
        uuid = (this.transaction || this).uuid;
        if (this.deny_includes_uuid > 1) {
            uuid = uuid.substr(0, this.deny_includes_uuid);
        }
    }
    
    var mess;
    var buf = '';

    while (mess = messages.shift()) {
        var line = code + (messages.length ? "-" : " ") + 
            (uuid ? '[' + uuid + '] ' : '' ) + mess;
        this.logprotocol("S: " + line);
        buf = buf + line + "\r\n";
    }

    try {
        this.client.write(buf);
    }
    catch (err) {
        return this.fail("Writing response: " + buf + " failed: " + err);
    }

    // Store the last response
    this.last_response = buf;

    // Don't change loop state
    if (this.state !== STATE_LOOP) {
        this.state = STATE_CMD;
    }

    // Run optional closure before handling and further commands
    if (func) func();

    // Process any buffered commands (PIPELINING)
    this._process_data();
}