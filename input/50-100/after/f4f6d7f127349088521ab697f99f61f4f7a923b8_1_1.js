function(src, command, data, tar, channel) {
    var user = SESSION.users(src);

    if (command in commands) {
        commands[command][1]({"user":user, "data":data, "target":tar, "channel":channel});
    }
}