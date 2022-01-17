function(content, start, removedCount) {
        console.log("-> arrayWillChange (content.length :"+this.contentLength()+", "+start+" , "+removedCount+")");

        var childViews = get(this, 'childViews'), len = get(childViews, 'length');

        /*if (removedCount === this.contentLength()) {
            this.deRenderRows();
        }
        this.updateRowCount();*/
    }