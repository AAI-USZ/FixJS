function onBlurAutocomplete(element){
	var hiddenField = jQuery("#"+element.id+"_hid");
	var textField = jQuery(element);

	if (hiddenField.val() == "" || hiddenField.val() == "ERROR") {
		if(textField.val() != ""){
			hiddenField.val("ERROR");
			textField.css('color', 'red');
		} else if (textField.val() == ""){
			hiddenField.val("");
		}
	}
    if(textField.val() === "" && !hiddenField.val() != "")  {
        hiddenField.val("");
    }
}