function(status)
    {
        var statuses = [];
        
        _.map(this.bits, function(value, index)
        {
            if(Math.pow(2, index) & status)
                statuses.push(value);
        });
        
        return statuses;
    }