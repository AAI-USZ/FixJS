function (code, message, exit) {
        stdout("ERR!".red.inverse + " " + message)
        if (exit == null || exit == true) {
            process.exit(code);
        }
    }