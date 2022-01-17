function (next) {
        patio.quoteIdentifiers = false;
        MYSQL_DB = patio.connect(config.MYSQL_URI + "/sandbox");

        MYSQL_DB.__defineGetter__("sqls", function () {
            return (comb.isArray(this.__sqls) ? this.__sqls : (this.__sqls = []));
        });

        MYSQL_DB.__defineSetter__("sqls", function (sql) {
            return this.__sqls = sql;
        });

        var origExecute = MYSQL_DB.__logAndExecute;
        MYSQL_DB.__logAndExecute = function (sql) {
            this.sqls.push(sql.trim());
            return origExecute.apply(this, arguments);
        };
        MYSQL_DB.forceCreateTable("test2",function () {
            this.name("text");
            this.value("integer");
        }).chainBoth(hitch(MYSQL_DB, "dropTable", "items"))
            .chainBoth(hitch(MYSQL_DB, "dropTable", "dolls"))
            .chainBoth(hitch(MYSQL_DB, "dropTable", "booltest"))
            .both(function () {
                next();
            });
    }