function modeEdit()
{
    editMode = true;
    wgtState = true;
    $( "#mp_word").sortable( "destroy" );
    $( "#mp_word").css( "margin-left", 0 ).empty().append('<textarea class="wgt_cont">'+word+'</textarea>');

}