function createFormRow(text, value, idForElement, info) {
    return '' +
        '<div class="control-group">' +
    		'<label for="' + idForElement + '" class="control-label">' + text + '</label>' +
    		'<div class="controls">' +
    			'<input id="' + idForElement + '" class="reg_input" type="text" value="' +
    				value + '" name="' + idForElement + '">' +
    				'<br>' +
    	    '</div>' +
    	    '<span class="reg_info">' + info + '</span>' +
        '</div>';
    
}