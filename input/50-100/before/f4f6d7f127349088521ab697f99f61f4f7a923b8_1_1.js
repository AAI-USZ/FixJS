function(src, command, data, tar, channel) {
    var user = SESSION.users(src);

    if (command in commands) {
        commands[command]({"user":user, "data":data, "target":tar, "channel":channel});
    }
}