function(bucket, idx) {
            dirty = true;
            self.addBucket(true);
            bucket.each(function(t) {
                var name = (typeOf(t) === 'number') ? Frog.Tags.get(t) : t;
                var tag = new Frog.Tag(t, name);
                tag.addEvent('close', function(t) {
                    $(t).destroy();
                    if (t.id > 0) {
                        self.data[idx].erase(t.id)
                    }
                    else {
                        self.data[idx].erase(t.name)
                    }
                    self.change();
                })
                self.element.getChildren()[idx].grab($(tag), 'top');
            })
        }