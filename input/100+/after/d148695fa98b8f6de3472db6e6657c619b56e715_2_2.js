function(bucket, idx) {
            dirty = true;
            var bucketObject = self.addBucket(true);
            bucket.each(function(t) {
                var name = (typeOf(t) === 'number') ? Frog.Tags.get(t) : t;
                var tag = new Frog.Tag(t, name);
                bucketObject.addTag(tag);
            });
        }