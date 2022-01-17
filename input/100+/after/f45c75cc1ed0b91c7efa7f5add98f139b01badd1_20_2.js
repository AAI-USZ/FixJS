function (useAt) {
    useAt = comb.isBoolean(useAt) ? useAt : false;
    patio.resetIdentifierMethods();
    return patio.connectAndExecute(config.DB_URI + "/sandbox",
        function (db) {
            db.forceDropTable(["employee"]);
            db.createTable("employee", function () {
                this.primaryKey("id");
                this.firstname("string", {size:20, allowNull:false});
                this.lastname("string", {size:20, allowNull:false});
                this.midinitial("char", {size:1});
                this.position("integer");
                this.gender("char", {size : 1});
                this.street("string", {size:50, allowNull:false});
                this.city("string", {size:20, allowNull:false});
                this[useAt ? "updatedAt" : "updated"]("datetime");
                this[useAt ? "createdAt" : "created"]("datetime");
            });
        }).addCallback(function (db) {
            DB = db;
        });
}