function() {
        if (fd[0] === "string" && /^[$_a-z0-9][a-z0-9]*$/.test(fd[1])) {
            return x + "." + fd[1];
        } else {
            return x + "[" + tfd + "]";
        }
    }