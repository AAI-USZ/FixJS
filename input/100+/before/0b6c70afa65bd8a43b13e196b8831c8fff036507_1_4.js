function (queue) {
    var movie = undefined;
    var savedMovie = undefined;
    queue.call("Try create model", function (callbacks) {

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

    queue.call("Try read model with id", function (callbacks) {

            var onSuccess = callbacks.add(function (object) {
                assertEquals("The movie should have the right title vs savedMovie", savedMovie.toJSON().title, movie.toJSON().title);
                assertEquals("The movie should have the right format vs savedMovie", savedMovie.toJSON().format, movie.toJSON().format);
                assertEquals("The movie should have the right title vs object", object.toJSON().title, movie.toJSON().title);
                assertEquals("The movie should have the right format vs object", object.toJSON().format, movie.toJSON().format);
            });

            var onError = callbacks.addErrback(function () {
                jstestdriver.console.log("create model v2 Error");
            });

            console.log("************" + movie.id);
            savedMovie = new Movie({id:movie.id});
            savedMovie.fetch({
                success:onSuccess,
                error:onError});
        }
    );

    queue.call("Try read model with index", function (callbacks) {

            var onSuccess = callbacks.add(function (object) {
                assertEquals("The movie should have the right title vs savedMovie", savedMovie.toJSON().title, movie.toJSON().title);
                assertEquals("The movie should have the right format vs savedMovie", savedMovie.toJSON().format, movie.toJSON().format);
                assertEquals("The movie should have the right title vs object", object.toJSON().title, movie.toJSON().title);
                assertEquals("The movie should have the right format vs object", object.toJSON().format, movie.toJSON().format);
            });

            var onError = callbacks.addErrback(function () {
                jstestdriver.console.log("can't find mode with title");
            });

            jstestdriver.console.log("************" + movie.toJSON().title);
            savedMovie = new Movie({title:movie.toJSON().title});
            savedMovie.fetch({
                success:onSuccess,
                error:onError});
        }
    );

    queue.call("Try read model that do not exist with index", function (callbacks) {

            var onError = callbacks.add(function (object) {
                assertTrue(true);
            });

            var onSuccess = callbacks.addErrback(function () {
                jstestdriver.console.log("film exist it's an error");
            });

            var nonExistMovie = new Movie({title:"Invalid film"});
            nonExistMovie.fetch({
                success:onSuccess,
                error:onError});
        }
    );
}