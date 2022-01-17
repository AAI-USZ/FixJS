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
                next();
            }