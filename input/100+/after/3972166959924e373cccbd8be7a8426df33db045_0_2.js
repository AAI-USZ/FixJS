function(content, start, removed, added) {
        if (!this.initialized) return;
        console.log("arrayDidChange (content.length :"+this.contentLength()+", "+start+" , "+removed+", "+added+")");
        console.log('taille du cache :'+this.rowsCache.length);
        console.log('taille du renderedRows :'+this.nbProperties(this.renderedRows));
        var itemViewClass = get(this, 'itemViewClass'),
            childViews = get(this, 'childViews'),
            view, item, idx, len, itemTagName;

        if ('string' === typeof itemViewClass) {
            itemViewClass = Ember.getPath(itemViewClass);
        }

        this.updateRowCount();
        this.renderRange();
    }