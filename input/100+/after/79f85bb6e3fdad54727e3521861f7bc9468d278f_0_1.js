function(me, query, fn, fn2) {
        return (me.selector == query.selector &&
                me.context == query.context &&
                (!fn || fn.$lqguid == query.fn.$lqguid) &&
                (!fn2 || fn2.$lqguid == query.fn2.$lqguid));
    }