function(callback)
    {
        this.queryRDS("DescribeDBInstances", [], this, false, "onCompleteDescribeDBInstances", callback);
    }