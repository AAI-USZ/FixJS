function(url, data){
        $("#dialogHolder").remove();
        $("#masterArea").after("<div id='dialogHolder'/>");
        var rootId = $("#RootId").val();
        var _data = $.extend({"RootId":rootId},data,{});
        _data.Popup=true;
        var moduleOptions = {
            id:"editModule",
            el:"#dialogHolder",
            url: url,
            data:_data,
            buttons: kyt.popupButtonBuilder.builder("editModule").standardEditButons()
        };
        this.modules.popupForm = new kyt.AjaxPopupFormModule(moduleOptions);
    }