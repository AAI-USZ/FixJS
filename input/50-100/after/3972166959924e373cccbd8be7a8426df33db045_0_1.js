function (){
        console.log('init de LazyCollection, taille du cache :'+this.rowsCache.length);
        console.log('taille du renderedRows :'+this.nbProperties(this.renderedRows));
        var ret = this._super();
        this.createCssRules();
        this.maxSupportedCssHeight = this.getMaxSupportedCssHeight();
        this.scrollbarDimensions = this.measureScrollbar();
        $(window).on("scroll", {self: this}, this.handleScroll);
        return ret;
    }