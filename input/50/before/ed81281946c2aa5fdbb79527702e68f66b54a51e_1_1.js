function modeEdit()
{
    editMode = true;
    wgtState = true;
    $( "#mp_word").css( "margin-left", 0 ).empty().append('<input value="'+word+'">');

}