function ajaxSave(rowid,shareduid) {
var state;
var cbId="#check_"+rowid+"_"+shareduid;

if($(cbId).is(':checked'))
    {
         state="true";
    }
else
    {
        state ="false";
    }
$.post(editurlshare, { participant_id: rowid, can_edit: state, shared_uid: shareduid } );
}