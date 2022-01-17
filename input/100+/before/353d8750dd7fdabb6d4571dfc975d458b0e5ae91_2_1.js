function(db){
            var callback = function(result){
                res.write(JSON.stringify(result));
                res.end();
            };
            
            var compiled = req.query.expression;
            
            var qs = db[req.query.entitySet];
            /*if (compiled.$include){
                for (var i = 0; i < compiled.$include.length; i++){
                    qs += '.include("' + compiled.$include[i] + '")';
                }
            }*/
            if (compiled.$filter) qs = qs.filter(compiled.$filter);
            if (compiled.$order){
                for (var i = 0; i < compiled.$order.length; i++){
                    qs = qs[compiled.$order[i].direction ? 'orderBy' : 'orderByDescending'](compiled.$order[i]);
                }
            }
            if (compiled.$skip) qs = qs.skip(compiled.$skip);
            if (compiled.$take) qs = qs.take(compiled.$take);
            if (compiled.$length) qs.length(callback);
            else qs.toArray(callback);
        }