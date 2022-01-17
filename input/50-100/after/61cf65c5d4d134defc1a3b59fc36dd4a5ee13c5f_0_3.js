function(){
		var affichClass=$(this).val();
		// Si le bt radio verification est coché:
		if ($("input:radio[value='CV']").next().attr('aria-pressed')){
		    if (affichClass == 'S')
			$('#CTRL tr.site').show();
		    else
			$('#CTRL tr.site').hide();
		}

	    }