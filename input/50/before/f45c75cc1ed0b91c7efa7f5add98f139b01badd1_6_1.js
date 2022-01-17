function (ds) {
            this.__dataset = ds;
            if (ds.db) {
                this.synced = false;
                this._setDb(ds.db);
            }
        }