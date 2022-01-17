function toggle_item_selection(event, modelname, single){
    var target = $(event.target).closest('.selectable');
    var oid = target.attr("id"); // in case of ipaddr, "id" has ipaddress string, instead of oid
    if (oid == null || oid == "") { return false; }

    var sibling_ids = target.parent().children().map(function(){return $(this).attr("id") || -1;});
    var target_obj_index = $.inArray(target.attr("id"), sibling_ids);

    if (single && target.filter('.selected_item').size() > 0) {
        select_off_selectable(target);
    }
    else if (single) {
        clear_selections();
        select_on_selectable(target);
    }
    else if (event.shiftKey && arguments.callee.last_clicked != undefined) {
        var listup = function(target, start, end) {
            if (end < start) { var tmp = end; end = start; start = tmp; }
            return $.grep(target.parent().children(), function(obj,i){return $(obj).filter('.selectable').size() > 0 && i >= start && i <= end;});
        };
        var start_obj_index = $.inArray($(selected_objects()).eq(-1).get()[0], sibling_ids);
        if (target.filter('.selected_item').size() > 0) {
            $(listup(target, start_obj_index, target_obj_index)).each(function(){select_off_selectable($(this));});
        }
        else {
            $(listup(target, start_obj_index, target_obj_index)).each(function(){select_on_selectable($(this));});
        }
    }
    else if (target.filter('.selected_item').size() > 0) {
        select_off_selectable(target);
    }
    else {
        select_on_selectable(target);
    }
    arguments.callee.last_clicked = target_obj_index;
    show_detailbox(modelname, oid, event.pageY - detailbox_offset(), false);
    return false;
}