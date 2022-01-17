function setupOptionAutocomplete(element, optionnames, optionvalues){

    var hiddenField = jQuery("#"+element.id+"_hid");
	var textField = jQuery(element);
    var select = false;

    var opnames = optionnames.split(",");
    var opvalues = optionvalues.split(",");
    var optionnamevaluemap = new Object();

    for(var i= 0; i< opnames.length ; i++){
        optionnamevaluemap[opnames[i]] = opvalues[i];
    }

    textField.autocomplete({
       source:opnames,
       minLength:2,
       select:function(event, ui) {
           hiddenField.val(optionnamevaluemap[ui.item.value]);
           select = true;
       },
       close: function(event, ui) {
		    if(select) {//user has selected item from the list
				textField.css('color', 'green');
            }
			else {
                textField.css('color', 'red');
				hiddenField.val("ERROR");
			}
			select = false;
	   }
    });
}