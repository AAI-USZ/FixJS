function (event) {
    var obj_id = parseInt($(this).attr("id").match(/[0-9]+$/)[0]);
    obj_id = parseInt(obj_id);
    var obj_type = $(this).attr("id").match(/^(.+)-/)[1];
    editor.highlightOverlay(obj_type, obj_id);
}