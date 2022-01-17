function(key) {
    return ((function(){
        var __monad__ = dbDeferredMonad;
        var query = "START a=node:users(key={key}) MATCH a-[r:adds|views|pinches]->b RETURN id(b) AS id, b.url AS url, collect(type(r)) AS relTypes ORDER BY id(b)"
        return __monad__.bind(liftDbOp(function(db) {
            return function(handler) {
                return db.query(query, {
                    "key": key
                }, handler);
            };
        }), function(res) {
            
            return __monad__.return(res);
        });
    })());
}