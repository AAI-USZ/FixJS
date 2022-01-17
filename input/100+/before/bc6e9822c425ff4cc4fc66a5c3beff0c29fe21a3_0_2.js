function() { 
    if ($("#available_tpl").length && $("#selected_tpl").length) {
        $("#available_tpl").multiSelect("#selected_tpl", {trigger: "#add", triggerAll: "#addAll", sortOptions: false, autoSubmit: false, afterMove: after_add});
        $("#selected_tpl").multiSelect("#available_tpl", {trigger: "#remove", triggerAll: "#removeAll", sortOptions: false, autoSubmit: false, afterMove: after_remove});

        $("#filter_tpl").change( function(){ 
            osFilter();
        })
        selected_tpls()
    }
}