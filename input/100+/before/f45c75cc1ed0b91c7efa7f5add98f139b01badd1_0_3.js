function (tableName, opts) {
            var m = this.outputIdentifierFunc,
                m2 = this.inputIdentifierFunc;
            var ds = this.metadataDataset
                .select(
                "pg_attribute__attname___name",
                sql.format_type("pg_type__oid", "pg_attribute__atttypmod").as(sql.literal('"dbType"')),
                sql.pg_get_expr("pg_attrdef__adbin", "pg_class__oid").as(sql.literal('"default"')),
                sql.NOT("pg_attribute__attnotnull").as(sql.literal('"allowNull"')),
                sql.COALESCE(sql.BooleanExpression.fromValuePairs({pg_attribute__attnum:sql.ANY("pg_index__indkey")}), false).as(sql.literal('"primaryKey"')),
                "pg_namespace__nspname"
            ).from("pg_class")
                .join("pg_attribute", {attrelid:sql.oid})
                .join("pg_type", {oid:sql.atttypid})
                .join("pg_namespace", {oid:sql.pg_class__relnamespace})
                .leftOuterJoin("pg_attrdef", {adrelid:sql.pg_class__oid, adnum:sql.pg_attribute__attnum})
                .leftOuterJoin("pg_index", {indrelid:sql.pg_class__oid, indisprimary:true})
                .filter({pg_attribute__attisdropped:false})
                .filter({pg_attribute__attnum:{gt:0}})
                .filter({pg_class__relname:m2(tableName)})
                .order("pg_attribute__attnum");
            ds = this.__filterSchema(ds, opts);
            var currentSchema = null;
            var ret = new Promise();
            return ds.map(function (row) {
                var sch = row.nspname;
                delete row.nspname;
                if (currentSchema) {
                    if (sch !== currentSchema) {
                        var error = new Error("columns from two tables were returned please specify a schema");
                        this.logError(error);
                        ret.errback(error);
                    }
                } else {
                    currentSchema = sch;
                }
                if (isBlank(row["default"])) {
                    row["default"] = null;
                }
                row.type = this.schemaColumnType(row.dbType);
                var fieldName = m(row.name);
                delete row.name;
                return [fieldName, row];

            }.bind(this));

        }