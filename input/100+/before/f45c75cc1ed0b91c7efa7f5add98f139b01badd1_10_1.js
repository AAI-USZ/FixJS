function () {
        Company = patio.addModel("company", {
            "static":{
                init:function () {
                    this._super(arguments);
                    this.manyToMany("employees");
                    this.manyToMany("omahaEmployees", {model:"employee"}, function (ds) {
                        return ds.filter(sql.identifier("city").ilike("omaha"));
                    });
                    this.manyToMany("lincolnEmployees", {model:"employee"}, function (ds) {
                        return ds.filter(sql.identifier("city").ilike("lincoln"));
                    });
                }
            }
        });
        Employee = patio.addModel("employee", {
            "static":{
                init:function () {
                    this._super(arguments);
                    this.manyToMany("companies");
                }
            }
        });
        return helper.createSchemaAndSync(true);
    }