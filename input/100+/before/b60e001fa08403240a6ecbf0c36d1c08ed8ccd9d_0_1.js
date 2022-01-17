function (args, callback) {
    var tmp_args, tmp_keys, i, il, key;

    if (Array.isArray(args) && typeof callback === "function") {
        return this.send_command("hmset", args, callback);
    }

    args = to_array(arguments);
    if (typeof args[args.length - 1] === "function") {
        callback = args[args.length - 1];
        args.length -= 1;
    } else {
        callback = null;
    }

    if (args.length === 2 && typeof args[0] === "string" && typeof args[1] === "object") {
        // User does: client.hmset(key, {key1: val1, key2: val2})
        tmp_args = [ args[0] ];
        tmp_keys = Object.keys(args[1]);
        for (i = 0, il = tmp_keys.length; i < il ; i++) {
            key = tmp_keys[i];
            tmp_args.push(key);
            tmp_args.push(args[1][key]);
        }
        args = tmp_args;
    }

    return this.send_command("hmset", args, callback);
}