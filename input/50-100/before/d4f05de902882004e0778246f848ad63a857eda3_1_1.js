function remoteCmd(cmd, args, success, error) {
    pm({
        target: window.parent,
        type: "command",
        data: {cmd: cmd, args: args},
        success: success,
        error: error
    });
//    alert('Sent '+cmd);
}