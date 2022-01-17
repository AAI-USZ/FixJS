function(content, start, removedCount) {
        console.log("-> arrayWillChange (content.length :"+this.contentLength()+", "+start+" , "+removedCount+")");

        console.log('taille du cache :'+this.rowsCache.length);
        console.log('taille du renderedRows :'+this.nbProperties(this.renderedRows));

        var childViews = get(this, 'childViews'), len = get(childViews, 'length');
        var nextContentLength = this.contentLength() - removedCount;

        if (len > nextContentLength){
            console.log('len > contentLength');
            this.updateRowCount((this.contentLength() - removedCount))
            /*this.deRenderRows({
                top : 0,
                bottom : this.contentLength()-1
            });*/
        }

        /*if (removedCount === this.contentLength()) {
            this.deRenderRows();
        }*/
        //this.updateRowCount();
    }