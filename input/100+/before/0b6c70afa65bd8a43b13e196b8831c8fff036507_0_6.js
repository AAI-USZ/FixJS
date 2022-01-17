function (storeName, object, options) {
            var writeTransaction = this.db.transaction([storeName], IDBTransaction.READ_WRITE);
            //this._track_transaction(writeTransaction);
            var store = writeTransaction.objectStore(storeName);
            var json = object.toJSON();

            if (!json.id) json.id = guid();

            var writeRequest = store.put(json, json.id);

            writeRequest.onerror = function (e) {
                options.error(e);
            };
            writeRequest.onsuccess = function (e) {
                options.success(json);
            };
        }