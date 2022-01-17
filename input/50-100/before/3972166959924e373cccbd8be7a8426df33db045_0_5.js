function() {
        this._super();
        this.cleanCache();
        $(window).off("scroll", this.handleScroll);
        this.$style.remove();
        this.stylesheet = null;
        this.$style = null;
    }