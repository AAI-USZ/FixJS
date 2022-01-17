function(props)
    {
        var proto = new this;
        $.extend(proto, props);
        for( var name in props ) proto[name] = props[name];
        
        function Collection()
        {
            if( this._construct ) return this._construct.apply(this, arguments);
        };
        Collection.prototype = proto;
        // create a new property from original options one
        Collection.prototype.options = $.extend({}, options);
        Collection.prototype.constructor = Collection;
        Collection.extend = cextendFnc;
        return Collection;
    }