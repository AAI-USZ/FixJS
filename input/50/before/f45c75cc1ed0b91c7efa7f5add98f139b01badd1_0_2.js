function (opts) {
            delete opts.query;
            var conn = new pg.Client(comb.merge({}, opts, {typeCast:false}));
            conn.connect();
            //conn.useDatabase(opts.database)
            return new Connection(conn);
        }