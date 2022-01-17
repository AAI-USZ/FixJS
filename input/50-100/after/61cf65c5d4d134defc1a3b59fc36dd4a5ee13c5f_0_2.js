function(){
		var affichClass=$(this).val();
		console.log(affichClass);
		$('#CTRL tr:not(.'+affichClass+')').hide();
		$('#CTRL tr.'+affichClass).show();
		$('#CTRL tr.static').show();
	    }