function startTests() {
        emit("browser-login", "Node")
        stream.write("login again")
        if (consumer) {
            consumer.removeListener("data", onData)
            consumer.removeListener("end", onEnd)
        }

        consumer = new Consumer()

        consumer.on("data", onData)

        consumer.on("end", onEnd)

        var child = spawn(testemOptions.command, testemOptions.args)
        child.stdout.pipe(consumer)
        child.stderr.pipe(stream)
    }