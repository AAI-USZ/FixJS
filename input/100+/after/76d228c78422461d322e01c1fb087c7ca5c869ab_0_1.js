function(src, msg, chan) {
    SESSION.users(src).channel = chan;

    if (msg.substr(0, 1) === "/") {
        sys.stopEvent();
        testClearChat();

        var data, command, tar;
        var pos = msg.indexOf(' ');

        if (pos !== -1) {
            command = msg.substring(1, pos).toLowerCase();
            data = msg.substr(pos+1);
            tar = sys.id(data);
        } else {
            command = msg.substr(1).toLowerCase();
        }

        commands.handleCommand(src, command, data, tar, chan);
    }
}