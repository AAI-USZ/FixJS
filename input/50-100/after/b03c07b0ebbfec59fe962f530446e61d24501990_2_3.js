function(){
            this.noBubbleUp=true;
            this.isPopup=true;
        this.popupForm = this.options.view ? new KYT.Views[this.options.view](this.options) : new KYT.Views.AjaxFormView(this.options);
        this.popupForm.render();
        this.storeChild(this.popupForm);
        $(this.el).append(this.popupForm.el);
    }