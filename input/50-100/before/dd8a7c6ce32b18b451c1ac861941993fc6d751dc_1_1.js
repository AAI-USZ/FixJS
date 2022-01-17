function (src, channel, command) {
        if (sys.auth(src) < 3) {
            commanderror(src, "Sorry, you do not have permission to use the download tiers command (owner command).", channel);
            return;
        }
        sys.webCall(command[1], tiers.install(resp, sys.name(src), command[1]));
    }