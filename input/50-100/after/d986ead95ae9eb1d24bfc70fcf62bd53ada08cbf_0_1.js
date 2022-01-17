function (hook) {
    var hookInSourceControl = path.resolve(__dirname, hook);

    if (fs.existsSync(hookInSourceControl)) {
        var hookInHiddenDirectory = path.resolve(__dirname, "..", ".git", "hooks", hook);

        if (fs.existsSync(hookInHiddenDirectory)) {
            fs.unlinkSync(hookInHiddenDirectory);
        }

        fs.linkSync(hookInSourceControl, hookInHiddenDirectory);
    }
}