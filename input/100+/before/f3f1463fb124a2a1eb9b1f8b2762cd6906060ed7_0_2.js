function()
    {
        if (!this.path.length) {
            ew_S3BucketsTreeView.display(this.core.queryModel('s3Buckets'));
        } else {
            var item = this.core.getS3Bucket(this.path[0])
            if (item.keys && item.keys.length) {
                ew_S3BucketsTreeView.display(item.keys);
            } else {
                this.core.api.listS3BucketKeys(item.name, null, function(obj) {
                    if (item.name == obj.name) {
                        ew_S3BucketsTreeView.display(obj.keys);
                    }
                })
            }
        }
    }