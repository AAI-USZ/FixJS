function Driver(schema, ready, started) {
        this.started        = started;
        this.schema         = schema;
        this.ready          = ready;
        this.error          = null;
        this.transactions   = []; // Used to list all transactions and keep track of active ones.
        this.db             = null;
        this.supportOnUpgradeNeeded = false;
        this.isUpgradeNeeded = false;
        var lastMigrationPathVersion = _.last(this.schema.migrations).version;
        debug_log("opening database " + this.schema.id + " in version #" + lastMigrationPathVersion);
        this.dbRequest      = indexedDB.open(this.schema.id,lastMigrationPathVersion); //schema version need to be an unsigned long

        this.launchMigrationPath = function(dbVersion) {
            var clonedMigrations = _.clone(schema.migrations);
            this.migrate(clonedMigrations, dbVersion, {
                ready: function () {
                    this.ready();
                }.bind(this),
                error: function () {
                    this.error = "Database not up to date. " + dbVersion + " expected was " + lastMigrationPathVersion;
                }.bind(this),
                started : function(){
                    this.started();
                }.bind(this)
            });
        };

        this.dbRequest.onblocked = function(event){
            debug_log("blocked");
        }

        this.dbRequest.onsuccess = function (e) {
            this.db = e.target.result; // Attach the connection ot the queue.
            debug_log("dbRequest open succeded on version #" + this.db.version);

            if(!this.supportOnUpgradeNeeded)
            {
                var currentIntDBVersion = (parseInt(this.db.version) ||  0); // we need convert beacuse chrome store in integer and ie10 DP4+ in int;

                if (currentIntDBVersion === lastMigrationPathVersion) { //if support new event onupgradeneeded will trigger the ready function
                    // No migration to perform!
                    this.started();
                    this.ready();
                } else if (currentIntDBVersion < lastMigrationPathVersion ) {
                    this.isUpgradeNeeded =true;
                    // We need to migrate up to the current migration defined in the database
                    this.launchMigrationPath(currentIntDBVersion);
                } else {
                    // Looks like the IndexedDB is at a higher version than the current driver schema.
                    this.error = "Database version is greater than current code " + currentIntDBVersion + " expected was " + lastMigrationPathVersion;
                }
            }
            else
            {
                //test if we are in upgrade processing because we finish the upgrade path
                if(this.isUpgradeNeeded){
                    //finir l'upgrade
                    this.onUpgradeDone(_.clone(this.schema.migrations),{
                                    ready: function () {
                                        this.ready();
                                    }.bind(this),
                                    error: function () {
                                        //this.error = "Database not up to date. " + dbVersion + " expected was " + lastMigrationPathVersion;
                                    }.bind(this),
                                    started : function(){
                                        this.started();
                                    }.bind(this)
                                });
                }
                else
                {
                    this.started();
                    this.ready();
                }

            }
        }.bind(this);



        this.dbRequest.onerror = function (e) {
            // Failed to open the database
            this.error = "Couldn't not connect to the database"
        }.bind(this);

        this.dbRequest.onabort = function (e) {
            // Failed to open the database
            this.error = "Connection to the database aborted"
        }.bind(this);



        this.dbRequest.onupgradeneeded = function(iDBVersionChangeEvent){
            this.db =iDBVersionChangeEvent.target.transaction.db;

            this.isUpgradeNeeded =true;
            this.supportOnUpgradeNeeded = true;

            debug_log("onupgradeneeded = " + iDBVersionChangeEvent.oldVersion + " => " + iDBVersionChangeEvent.newVersion);
            this.launchMigrationPath(iDBVersionChangeEvent.oldVersion);


        }.bind(this);


    }