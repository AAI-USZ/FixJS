function(){
            console.log("resizeTabs()");

            var instance = this;
            $('.'+this.selector).each(function(){instance.resize(this)});
        }