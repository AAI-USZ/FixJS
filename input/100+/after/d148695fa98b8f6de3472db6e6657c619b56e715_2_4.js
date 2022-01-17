function() {
        var idx = this.buckets.length - 1;
        var bucket = new Frog.Bucket(idx);
        $(bucket).inject(this.element);
        bucket.addEvent('change', this.change);
        bucket.addEvent('empty', function(b) {
            if (this.buckets.length > 1) {
                $(b).destroy();
                this.buckets.erase(b);
                this.fireEvent('remove', [this, b]);
            }
        }.bind(this));
        // Ext.create('Ext.Button', {
        //     text: 'add',
        //     renderTo: bucket.li,
        //     height: 22,
        //     handler: this.addBucket.bind(this)
        // });
        
        this.buckets.push(bucket);
        this.sortables.addLists($(bucket));

        this.fireEvent('add', this);
        
        return bucket;

    }