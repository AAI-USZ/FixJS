function(config) {
    if (global.$_APP === null) {
        global.$_APP = new Application(config);
    }
    return global.$_APP;
}