function remoteCmd(cmd, args, success, error) {
    pm({
        target: window.frames[0],
        type: "command",
        data: {cmd: cmd, args: args},
        success: success,
        error: error
    });
}