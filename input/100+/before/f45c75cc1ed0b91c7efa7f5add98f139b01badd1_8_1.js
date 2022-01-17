function (next) {
        patio.quoteIdentifiers = false;
        //patio.configureLogging();
        PG_DB = patio.connect("pg://test:testpass@localhost:5432/sandbox");

        PG_DB.__defineGetter__("sqls", function () {
            return (comb.isArray(this.__sqls) ? this.__sqls : (this.__sqls = []));
        });

        PG_DB.__defineSetter__("sqls", function (sql) {
            return this.__sqls = sql;
        });


        var origExecute = PG_DB.__logAndExecute;
        PG_DB.__logAndExecute = function (sql) {
            this.sqls.push(sql.trim());
            return origExecute.apply(this, arguments);
        };
        comb.serial([
            function () {
                return PG_DB.forceCreateTable("test", function () {
                    this.name("text");
                    this.value("integer", {index:true});
                });
            },
            function () {
                return PG_DB.forceCreateTable("test2", function () {
                    this.name("text");
                    this.value("integer");
                });
            },
            function () {
                return PG_DB.forceCreateTable("test3", function () {
                    this.value("integer");
                    this.time(sql.TimeStamp);
                });
            },
            function () {
                return PG_DB.forceCreateTable("test4", function () {
                    this.name(String, {size:20});
                    this.value("bytea");
                });
            }
        ]).classic(next);
    }