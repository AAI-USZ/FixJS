function (table) {
            var parts = this.__schemaAndTable(table);
            var m2 = this.inputIdentifierFunc;
            var schema = parts[0];
            table = parts[1];
            var ds = this.from(table)
                .select("pg_attribute__attname___name")
                .from("pg_index", "pg_class", "pg_attribute", "pg_namespace")
                .where([
                [identifier("pg_class__oid"), identifier("pg_attribute__attrelid")],
                [identifier("pg_class__relnamespace"), identifier("pg_namespace__oid")],
                [identifier("pg_class__oid"), identifier("pg_index__indrelid")],
                [identifier("pg_index__indkey").sqlSubscript(0), identifier("pg_attribute__attnum")],
                [identifier("indisprimary"), true],
                [identifier("pg_class__relname"), m2(table.toString())]
            ]);
            if (schema) {
                ds.filter({pg_namespace__nspname:m2(schema)});
            }
            return ds.all();

        }