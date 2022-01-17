function(e1) {
            if(e1) {
                self.pool.cql(util.format('create columnfamily %s (key text PRIMARY KEY)', columnFamily), [], function(e2) {
                    if(e2) {
                        throw e2;
                    }
                });
            }
        }