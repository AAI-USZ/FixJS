function(props)
    {
        var newly;
        newly = Class.extend.call(this, props);
        newly.extend = cextendFnc;
        newly.prototype.class= newly;
        newly.trigger = function(event){ $(newly).triggerHandler(event); };
        return newly;
    }