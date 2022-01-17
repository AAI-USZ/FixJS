function(adds) {
            
            return __monad__.bind(getRelForNodes(getViewsRel, adds, key), function(views) {
                
                return __monad__.bind(getRelForNodes(getPinchesRel, adds, key), function(pinches) {
                    var zipped = underscore.zip(adds, views, pinches)
                    return __monad__.return(zipped.map(function(tuple) {
                        return {
                            "id": tuple[0].id,
                            "url": tuple[0].data.url,
                            "relTypes": tuple.slice(1).reduce(function(b, a) {
                                return b.concat(a);
                            }).map(function(a) {
                                return a.type;
                            })
                        };
                    }));
                });
            });
        }