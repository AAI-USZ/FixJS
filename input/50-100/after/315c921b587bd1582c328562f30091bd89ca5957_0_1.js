function(json) {
        if (json) {
            this.store(json);
        }
        this.displayBanner();
        pl('.preloadercompanybanner').hide();
        pl('.companybannerwrapper').show();
    }