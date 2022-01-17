function(b) {
            if (this.buckets.length > 1) {
                $(b).destroy();
                this.buckets.erase(b);
                this.fireEvent('remove', [this, b]);
            }
        }