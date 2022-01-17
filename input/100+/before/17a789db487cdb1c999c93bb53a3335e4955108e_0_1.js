function() {
        this.url = this.urlHelper();
        
        if(this.url.hasFragment) {
            arguments[2].display = -1;
        }

        this.parent.apply(this, arguments);
        if(this.options.setAriaSupport) {
            this.addKeyFunction();
        }
        this.checkId();
        this.urlInteraction();

        //Contao Special
        //$$('.ce_accordion')
    }