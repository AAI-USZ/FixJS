function ajaxSave(rowid,shareduid) {
var state;

if($('#check_'+rowid+'_'+shareduid).is(':checked'))
    {
         state = "true";
    }
else 
    {
        state ="false";
    }
$.post(editurlshare, { participant_id: rowid, can_edit: state, shared_uid: shareduid } );
}