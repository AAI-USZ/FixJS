function (callbacks) {

            var stepOnUpgrade = 1;

            var databasev3 = {
                id:"movies-database-beforeandnext",
                description:"The database for the Movies",
                migrations:[
                    {
                        version:1,
                        migrate:function (transaction, next) {
                            var store = transaction.db.createObjectStore("movies");
                            next();
                        }
                    },
                    {
                        version:2,
                        before:callbacks.add(function (next) {
                            jstestdriver.console.log("before");
                            jstestdriver.console.log("migration path step before #1");
                            assertEquals("migration path step before", 1, stepOnUpgrade);
                            stepOnUpgrade++;
                            next();
                        }),
                        migrate:callbacks.add(function (transaction, next) {
                            var store = undefined;
                            if (!transaction.db.objectStoreNames.contains("movies")) {
                                store = transaction.db.createObjectStore("movies");
                            }
                            store = transaction.objectStore("movies");
                            store.createIndex("titleIndex", "title", {
                                unique:false
                            });
                            store.createIndex("formatIndex", "format", {
                                unique:false
                            });
                            jstestdriver.console.log("migration path step migrate #2");
                            assertEquals("migration path step migrate", 2, stepOnUpgrade);
                            stepOnUpgrade++;
                            next();
                        }),
                        after:callbacks.add(function (next) {
                            jstestdriver.console.log("after");
                            var m = new MovieV3();
                            m.save({
                                title:"The Matrix 3",
                                format:"dvd"
                            }, {
                                success:callbacks.add(function () {
                                    jstestdriver.console.log("migration path step save #4");
                                    assertEquals("migration path step save", 4, stepOnUpgrade);
                                    stepOnUpgrade++;
                                })
                            });
                            jstestdriver.console.log("migration path step after #3");
                            assertEquals("migration path step after", 3, stepOnUpgrade);
                            stepOnUpgrade++;
                            next();
                        })
                    }
                ]
            };

            deleteDB(databasev3);

            var MovieV3 = Backbone.Model.extend({
                database:databasev3,
                storeName:"movies"
            });


            var onSuccess = callbacks.add(function () {
                jstestdriver.console.log("get model v3 Success");
                jstestdriver.console.log("migration path step is 5 #5");
                assertEquals("migration path step is 5", 5, stepOnUpgrade);
            });

            var onError = callbacks.addErrback(function () {
                jstestdriver.console.log("migration path step is 5 #5");
                jstestdriver.console.log("get model v3 Error");
            });


            var movie = new MovieV3({title:"The Matrix 3"});
            movie.fetch({
                success:onSuccess,
                error:onError});
        }