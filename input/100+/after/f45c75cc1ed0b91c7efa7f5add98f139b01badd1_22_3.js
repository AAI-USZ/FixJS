function () {
        DB1 = patio.connect(config.DB_URI + "/sandbox");
        DB2 = patio.connect(config.DB_URI + "/sandbox2");

        Employee = patio.addModel(DB1.from("employee"), {
            "static":{
                //class methods
                findByGender:function (gender, callback, errback) {
                    return this.filter({gender:gender}).all();
                }
            }
        });
        Employee2 = patio.addModel(DB2.from("employee"), {
            "static":{
                //class methods
                findByGender:function (gender, callback, errback) {
                    return this.filter({gender:gender}).all();
                }
            }
        });
        return createTablesAndSync();
    }