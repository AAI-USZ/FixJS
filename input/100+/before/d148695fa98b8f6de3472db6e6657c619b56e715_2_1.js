function(bucket) {
            var clean = bucket.filter(function(item) { return item !== "" });
            self.data.push(clean);
        }