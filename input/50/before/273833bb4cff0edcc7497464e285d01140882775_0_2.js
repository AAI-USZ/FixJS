function(ev) {
            if (request.errorCode === getIDBDatabaseException().VERSION_ERR) {
                // xxx blow it away
                self.idb.deleteDatabase(self.name);
                // try it again.
                return self.init(options, callback);
            }
            console.error('Failed to open database');
        }