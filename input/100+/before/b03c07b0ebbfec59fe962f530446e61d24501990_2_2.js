function(){
        this.options = $.extend({},KYT.tokenDefaults,this.options);

        if(!this.options.availableItems || this.options.availableItems.length==0) {
            $("#noAssets",this.el).show();
            $("#hasAssets",this.el).hide();
        }else{
            $("#noAssets",this.el).hide();
            $("#hasAssets",this.el).show();
            this.inputSetup();
        }
    }