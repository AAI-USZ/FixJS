function(iDBVersionChangeEvent){
            this.db =iDBVersionChangeEvent.target.transaction.db;

            this.isUpgradeNeeded =true;
            this.supportOnUpgradeNeeded = true;

            debug_log("onupgradeneeded = " + iDBVersionChangeEvent.oldVersion + " => " + iDBVersionChangeEvent.newVersion);
            this.launchMigrationPath(iDBVersionChangeEvent.oldVersion);


        }