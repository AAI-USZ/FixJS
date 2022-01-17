function(){
        	var paramsetName = $(this).find(textid).val().trim();
        	if( paramsetName === "" ){
        		return;
        	}
        	var option = $(this).dialog('option');
        	var nid = option.nid;
        	var tplview = option.tplview;
        	tplview.tplview(funcname, paramsetName);

        	$(this).find(textid).val("");
            $(this).dialog('close');
		}