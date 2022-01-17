function startTests() {
    socket.emit('browser-login', 'Node')
    if (runner) {
        runner.removeListener("file", onFile)
        runner.removeListener("end", onEnd)
    }

    runner = new Runner({
        argv: {
            remain: "test"
        }
        , version: false
        , help: false
        , timeout: 30
        , diag: process.env.TAP_DIAG
        , tap: process.env.TAP_DIAG
        , stderr: process.env.TAP_STDERR
        , cover:  "./lib"
        , "cover-dir": "./coverage"
    })

    runner.on("file", onFile)

    runner.on("end", onEnd)
}