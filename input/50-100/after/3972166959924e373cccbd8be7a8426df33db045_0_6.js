function() {
        this._super();
        this.deRenderAllRows();
        this.clearCache();
        this.$style.remove();
        this.stylesheet = null;
        this.$style = null;
        console.log('Destroy de LazyCollection, taille du cache :'+this.rowsCache.length);
        console.log('taille du renderedRows :'+this.nbProperties(this.renderedRows));
    }