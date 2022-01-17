function(data) {
    	var jdata = null;
    	try{
    		jdata = eval('(' + data + ')');
    	}catch(e){}

    	if ( jdata == null ){
        	var newForm = $(data).find('#form_data');
    		openZIMtinyMce.removeEditors();
    		$('#form_data').replaceWith(newForm);
    		// 	re-init tiny mces
    		openZIMtinyMce.setup();
    		// re init expanders
    		openZIMExpander.init();
    	} else {
    		switch (jdata.method) {
			case 'set':
				$.each(jdata.actions, function(index, value){
	        		$('#' + index).text(value);
	    		});
				break;
			case 'remove':
				$.each(jdata.actions, function(index, value){
	        		$('#' + value).remove();
	    		});
				break;
			default:
				break;
			}
    		openZIMtinyMce.resetDirty();
    	}
    }