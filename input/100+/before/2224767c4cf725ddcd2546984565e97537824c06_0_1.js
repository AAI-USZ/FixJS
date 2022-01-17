function (reply) {
    var command_obj, obj, i, len, type, timestamp, argindex, args, queue_len;
    
    queue_len = this.command_queue.getLength();

    if (this.pub_sub_mode === false && queue_len === 0) {
        this.emit("idle");
        this.command_queue = new Queue();  // explicitly reclaim storage from old Queue
    }
    if (this.should_buffer && queue_len <= this.command_queue_low_water) {
        this.emit("drain");
        this.should_buffer = false;
    }

    command_obj = this.command_queue.shift();

    if (command_obj && !command_obj.sub_command) {
        if (typeof command_obj.callback === "function") {
            if (this.options.detect_buffers && command_obj.buffer_args === false) {
                // If detect_buffers option was specified, then the reply from the parser will be Buffers.
                // If this command did not use Buffer arguments, then convert the reply to Strings here.
                reply = reply_to_strings(reply);
            }

            // TODO - confusing and error-prone that hgetall is special cased in two places
            if (reply && 'hgetall' === command_obj.command.toLowerCase()) {
                reply = reply_to_object(reply);
            }

            try_callback(command_obj.callback, reply);
        } else if (exports.debug_mode) {
            console.log("no callback for reply: " + (reply && reply.toString && reply.toString()));
        }
    } else if (this.pub_sub_mode || (command_obj && command_obj.sub_command)) {
        if (Array.isArray(reply)) {
            type = reply[0].toString();

            if (type === "message") {
                this.emit("message", reply[1].toString(), reply[2]); // channel, message
            } else if (type === "pmessage") {
                this.emit("pmessage", reply[1].toString(), reply[2].toString(), reply[3]); // pattern, channel, message
            } else if (type === "subscribe" || type === "unsubscribe" || type === "psubscribe" || type === "punsubscribe") {
                if (reply[2] === 0) {
                    this.pub_sub_mode = false;
                    if (this.debug_mode) {
                        console.log("All subscriptions removed, exiting pub/sub mode");
                    }
                } else {
                    this.pub_sub_mode = true;
                }
                // subscribe commands take an optional callback and also emit an event, but only the first response is included in the callback
                // TODO - document this or fix it so it works in a more obvious way
                if (command_obj && typeof command_obj.callback === "function") {
                    try_callback(command_obj.callback, reply[1].toString());
                }
                this.emit(type, reply[1].toString(), reply[2]); // channel, count
            } else {
                throw new Error("subscriptions are active but got unknown reply type " + type);
            }
        } else if (! this.closing) {
            throw new Error("subscriptions are active but got an invalid reply: " + reply);
        }
    } else if (this.monitoring) {
        len = reply.indexOf(" ");
        timestamp = reply.slice(0, len);
        argindex = reply.indexOf('"');
        args = reply.slice(argindex + 1, -1).split('" "').map(function (elem) {
            return elem.replace(/\\"/g, '"');
        });
        this.emit("monitor", timestamp, args);
    } else {
        throw new Error("node_redis command queue state error. If you can reproduce this, please report it.");
    }
}