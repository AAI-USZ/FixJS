function(dbVersion) {
            var clonedMigrations = _.clone(schema.migrations);
            this.migrate(clonedMigrations, dbVersion, {
                success: function () {
                    this.ready();
                }.bind(this),
                error: function () {
                    this.error = "Database not up to date. " + dbVersion + " expected was " + lastMigrationPathVersion;
                }.bind(this)
            });
        }