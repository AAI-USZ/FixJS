function show_detailbox_without_selection(event, modelname){
    var target = $(event.target).closest('.selectable,.unselectable');
    var oid = target.attr("id"); // in case of ipaddr, "id" has ipaddress string, instead of oid
    if (oid == null || oid == "") {return false; }
    show_detailbox(modelname, oid, event.pageY - detailbox_offset(), false);
    return false;
}