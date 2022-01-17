function(bucket, callback)
    {
        this.queryS3("GET", bucket, "", "?acl", {}, content, this, false, "onCompleteGetS3BucketAcl", callback);
    }