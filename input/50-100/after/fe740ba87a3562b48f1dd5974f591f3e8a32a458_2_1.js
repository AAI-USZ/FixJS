function handleBuild() {
    var node = $(this);

    bus.ajax(
        "GET",
        "http://127.0.0.1:9910/ripple/about",
        null,
        function () {
            doBuild(node);
        },
        function (error) {
            if (error.code === 0 || error.code === 404) {
                startServices(function () {
                    doBuild(node);
                });
            }
        }
    );

}