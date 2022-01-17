function()
    {
        var me = this;
        if (!this.path.length) {
            this.display(this.core.queryModel('s3Buckets'));
        } else {
            var item = this.core.getS3Bucket(this.path[0])
            if (item.keys && item.keys.length) {
                this.display(item.keys);
            } else {
                this.core.api.listS3BucketKeys(item.name, null, function(obj) {
                    if (item.name == obj.name) {
                        me.display(obj.keys);
                    }
                })
            }
        }
    }