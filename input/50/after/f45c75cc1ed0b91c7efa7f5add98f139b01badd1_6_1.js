function (ds) {
            this.__dataset = ds;
            if (ds.db) {
                this._setDb(ds.db);
            }
        }