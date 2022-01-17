function(){
        var __monad__ = dbDeferredMonad;
        var query = "START a=node:users(key={key}) MATCH a-[r:adds]->b RETURN b"
        return __monad__.bind(liftDbOp(function(db) {
            return function(handler) {
                return db.query(query, {
                    "key": key
                }, handler);
            };
        }), function(res) {
            
            return __monad__.return(res.map(function(a) {
                return a.b;
            }));
        });
    }