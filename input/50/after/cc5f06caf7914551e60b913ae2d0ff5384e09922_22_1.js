function (app, bootstrapData) {
        log('bootstrapped data', bootstrapData);
        // Start the app as soon as the DOM is ready, loading in the bootstrapped data
        $(function () {
            app.start(bootstrapData);
        });
    }