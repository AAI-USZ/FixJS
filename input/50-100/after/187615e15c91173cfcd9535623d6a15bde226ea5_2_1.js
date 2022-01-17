function (a)
    {
        if (this.deferred.length > 0)
            a.genListing("DEFERRED CODE START:");

        for (var i=0; i<this.deferred.length; i++)
            a.codeBlock.extend(this.deferred[i]);

        if (this.deferred.length > 0)
            a.genListing("DEFERRED CODE END");

        this.deferred = [];
    }