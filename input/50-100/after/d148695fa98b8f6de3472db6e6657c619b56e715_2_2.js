function(tag) {
        $(tag).destroy();
        this.tags.erase(tag);
        if (this.tags.length === 0) {
            this.fireEvent('onEmpty', [this]);
        }
        this.fireEvent('onChange');
    }