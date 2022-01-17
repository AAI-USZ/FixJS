function body_mouseleave() {
    var value = get_editionMode()
    if (value == 'NO MOVE') 
        return
    
    //check if a 'fastedit_tag_' is currently selected, 
    //see below why
    var limited = false
    try {
        selected_id = $(document.activeElement).attr("id")
        if (selected_id != undefined) {
            if (selected_id.substring(0, "fastedit_tag_".length) == "fastedit_tag_") {
                limited = true
            }
        }
    } catch (e) {
        alert(e)
    }
    
    $(this).find(".edit").hide()
    //this is a bug I can't understand today,
    //if we click on the 'tag select' and try to go down,
    //this one will make the list disappear!
    if (!limited)
        $(this).find(".optional").hide()
    $(this).find(".edit_visible").show()
}