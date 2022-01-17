function(text) {
        if(text===null||text===undefined)
            text="null";
        if($("#jQUi").length>0)
            $("#jQUi").popup(text.toString());
        else
            $(document.body).popup(text.toString());
    }