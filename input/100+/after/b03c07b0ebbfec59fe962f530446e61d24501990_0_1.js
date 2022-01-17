function(url, data){
        var rootId = KYT.State.get("Relationships").rootId;
        var _data = $.extend({"RootId":rootId, Popup:true},data,{});
        var formOptions = {
            id: "editModule",
            url: url,
            data:_data,
            view:this.options.subViewName,
            buttons: KYT.Views.popupButtonBuilder.builder("editModule").standardEditButons()
        };
        this.ajaxPopupFormModule = new KYT.Views.AjaxPopupFormModule(formOptions);
        this.ajaxPopupFormModule.render();
        this.storeChild(this.ajaxPopupFormModule);

    }