function(){
		var affichClass=$(this).val();
	    $('#CTRL tr:not(.'+affichClass+')').hide();
		$('#CTRL tr.'+affichClass).show();
		$('#CTRL tr.static').show();
	    }