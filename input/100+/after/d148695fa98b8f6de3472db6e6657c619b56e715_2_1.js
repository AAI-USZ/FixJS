function(options) {
        var self = this;
        this.setOptions(options);

        var data = this.options.data || [[]];
        this.data = [];
        this.buckets = [];
        this.sortables = new Sortables($$('.frog-bucket'), {
            clone: true,
            revert: true,
            opacity: 0.7
        });
        this.sortables.addEvent('complete', function(el) {
            var bucket = el.parentNode;
            this.buckets[0].addTag(el.dataset.frog_tag_id.toInt());
        }.bind(this));
        data.each(function(bucket) {
            var clean = bucket.filter(function(item) { return item !== "" });
            self.data.push(clean);
        })
        this.element = new Element('div', {id: 'frog_builder'});
        this.change = this._change.bind(this);
        this.historyCallback = this._historyEvent.bind(this);

        window.addEventListener('hashchange', this.historyCallback, false);

        var dirty = false;

        this.data.each(function(bucket, idx) {
            dirty = true;
            var bucketObject = self.addBucket(true);
            bucket.each(function(t) {
                var name = (typeOf(t) === 'number') ? Frog.Tags.get(t) : t;
                var tag = new Frog.Tag(t, name);
                bucketObject.addTag(tag);
            });
        });
        if (this.data.length === 0) {
            this.addBucket(true);
            dirty = true;
        }

        if (dirty) {
            this.change();
        }
    }