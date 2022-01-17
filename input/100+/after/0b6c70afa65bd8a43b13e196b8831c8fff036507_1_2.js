function (transaction, next) {
                            debugger;
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
                            //assertEquals("migration path step migrate", 2, stepOnUpgrade);
                            stepOnUpgrade++;
                            next();
                        }