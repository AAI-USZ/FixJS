function (app, bootstrapData) {
        log(bootstrapData);
        // Start the app as soon as the DOM is ready, loading in the bootstrapped data
        $(function () {
            app.start(bootstrapData);
        });
    }