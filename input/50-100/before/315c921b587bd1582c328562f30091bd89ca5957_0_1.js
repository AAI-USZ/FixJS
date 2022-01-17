function(json) {
        if (json) {
            this.store(json);
        }
        this.displayBanner();
        this.displayFollow();
        this.displayTabs();
        pl('.preloadercompanybanner').hide();
        pl('.companybannerwrapper').show();
    }