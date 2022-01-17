function(result){
        if(result.LoggedOut){
            window.location.replace(result.RedirectUrl);
            return;
        }
        $(this.el).html($("#gridTemplate").tmpl(result));
        $.extend(this.options,result);
//        if(gridControllerOptions){
//            $.extend(true, this.options, gridControllerOptions);
//        }

        $.each(this.options.headerButtons,$.proxy(function(i,item){
            $(this.el).find("."+item).show();
        },this));

        var gridContainer = this.options.gridContainer;
        // if we have more then one grid, jqgrid doesn't scope so we need different names.
        if(this.options.gridContainer!="#gridContainer"){
            this.$el.find("#gridContainer").attr("id",this.options.gridContainer.replace("#",""));
        }

        $(gridContainer,this.el).AsGrid(this.options.gridDef, this.options.gridOptions);
        ///////
       // $(window).bind('resize', function() { cc.gridHelper.adjustSize(gridContainer); }).trigger('resize');
        $(this.el).gridSearch({onClear:$.proxy(this.removeSearch,this),onSubmit:$.proxy(this.search,this)});
        //callback for render
        this.viewLoaded();
        //general notification of pageloaded
        KYT.vent.trigger("grid:"+this.id+":pageLoaded",this.options);
        KYT.vent.bind("AddUpdateItem",this.editItem,this);
        KYT.vent.bind("DisplayItem",this.displayItem,this);
    }