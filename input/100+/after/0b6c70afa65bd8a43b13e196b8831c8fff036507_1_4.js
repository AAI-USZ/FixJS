function (queue) {
    var movie = undefined;
    var savedMovie = undefined;
    queue.call("Try save model", function (callbacks) {

            var onSuccess = callbacks.add(function () {
                assertTrue("model created", true);
            });

            var onError = callbacks.addErrback(function () {
                jstestdriver.console.log("model v2 Error");
            });


            movie = new Movie();
            movie.save({
                    title:"The Matrix 3",
                    format:"dvd"
                },
                {
                    success:onSuccess,
                    error:onError});
        }
    );
}