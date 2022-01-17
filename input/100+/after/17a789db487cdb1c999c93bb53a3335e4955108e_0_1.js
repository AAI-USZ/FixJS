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
        
        if(this.options.display >= 0) {
            this.addFragment(this.togglers[this.options.display].getParent(this.options.anchorItem));
            arguments[2].display = -1;
        }

        //Contao Special
        //$$('.ce_accordion')
    }