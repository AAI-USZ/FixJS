function(){
            $(this.ajaxPopupFormModule.el).find("#EntityId").val(0);
            KYT.vent.unbind("form:editModule:pageLoaded");
        }