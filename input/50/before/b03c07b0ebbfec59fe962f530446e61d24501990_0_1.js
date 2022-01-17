function(){
            $(this.ajaxPopupFormModule.el).find("#Event_EntityId").val(0);
            KYT.vent.unbind("form:editModule:pageLoaded");
        }