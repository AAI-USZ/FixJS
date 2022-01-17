function (a)
    {
        for (var i=0; i<this.deferred.length; i++)
            a.codeBlock.extend(this.deferred[i]);
        this.deferred = [];
    }