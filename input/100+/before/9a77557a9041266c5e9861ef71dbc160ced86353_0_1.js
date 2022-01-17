function ajaxSave(rowid) {
    var state;

    if($('#visible_'+rowid).is(':checked') == true)
    {
        state = "TRUE";
    }
    else
    {
        state = "FALSE";
    }
    $.post(editAttributeUrl, { id: rowid, visible: state, oper : 'edit' } );
}