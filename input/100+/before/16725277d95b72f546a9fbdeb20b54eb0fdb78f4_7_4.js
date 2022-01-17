function(err, cacheHandler) {
    if (err) {
        throw err;
    } else {
        console.log("mongodb connected, starting http server...");
        options.cacheHandler = cacheHandler;
        startupComponents(options);
    }
}