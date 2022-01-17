function (underscore) {
    underscore = underscore === true;
    if (underscore) {
        patio.camelize = underscore;
    } else {
        patio.resetIdentifierMethods();
        patio.quoteIdentifiers = false;
    }
    return patio.connectAndExecute(config.DB_URI + "/sandbox",
        function (db) {
            db.forceDropTable(["staff", "executive", "manager", "employee"]);
            db.createTable("employee", function () {
                this.primaryKey("id")
                this.name(String);
                this.kind(String);
            });
            db.createTable("manager", function () {
                this.primaryKey("id");
                this.foreignKey(["id"], "employee", {key:"id"});
                this.numstaff("integer");
            });
            db.createTable("executive", function () {
                this.primaryKey("id");
                this.foreignKey(["id"], "manager", {key:"id"});
                this.nummanagers("integer");
            });
            db.createTable("staff", function () {
                this.primaryKey("id");
                this.foreignKey(["id"], "employee", {key:"id"});
                this.foreignKey("managerid", "manager", {key:"id"});
            });
        }).addCallback(function (db) {
            DB = db;
        });
}