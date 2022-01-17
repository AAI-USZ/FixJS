function(bucket, callback)
    {
        return this.queryS3("GET", bucket, "", "?policy", {}, content, this, callback ? false : true, "onCompleteGetS3BucketPoilicy", callback);
    }