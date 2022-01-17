function (hook) {
    var hookInSourceControl = path.resolve(__dirname, hook);

    if (path.existsSync(hookInSourceControl)) {
        var hookInHiddenDirectory = path.resolve(__dirname, "..", ".git", "hooks", hook);

        if (path.existsSync(hookInHiddenDirectory)) {
            fs.unlinkSync(hookInHiddenDirectory);
        }

        fs.linkSync(hookInSourceControl, hookInHiddenDirectory);
    }
}