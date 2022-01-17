function validMass() {
    if ($(".massedit_action:checked").size() == 0) {
        alert("Pas d'action à effectuer / tag selectionné ...") ;
        return ;
    }
        
    var size_photos = $(".massedit_chkbox:checked").size()
    if (size_photos == 0) {
        alert("Pas de photo selectionnée ...");
        return ;
    }
    var size_tags = $("#massTagList option:selected").size()
    if (size_tags == 0 && $(".massedit_tag").is(":checked")) {
        alert("Pas de tag selectionné...");
        return ;
    }
    
    if (($("#turnAuthor").is(":checked") || $("#turnMove").is(":checked")) && size_tags != 1) {
        alert("Selectionnez seulement un tag ...");
        return ;
    }
    
    document.forms[0].submit()
}