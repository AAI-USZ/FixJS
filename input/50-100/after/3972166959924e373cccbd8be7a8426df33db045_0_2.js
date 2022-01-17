function(withOutBuffer) {
        if (!this.initialized) {
            return;
        }
        console.log('renderRange');
        var renderedRange = this.getRenderedRange();

        // remove unused rows
        this.deRenderRows(renderedRange);

        // add new rows
        this.renderRows(renderedRange);


        console.log('taille du cache :'+this.rowsCache.length);
        console.log('taille du renderedRows :'+this.nbProperties(this.renderedRows));

        this.lastRenderedScrollTop = this.scrollTop;
    }