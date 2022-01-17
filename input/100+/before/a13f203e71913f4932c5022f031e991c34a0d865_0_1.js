function(){
		var id = $(this).attr('id').replace(/Open/,'');
		if($('#'+id).is(":hidden")){
			if(id == "superplastic") loadSuperplastic();
			else {
				createCookie(id, true, expires);
				if(id == "music") if(muted) mute();				
			}
			$('#'+id).fadeIn(fade);
			$(this).addClass('active');
		}
		else {
			eraseCookie(id);
			$('#'+id).fadeOut(fade);
			$(this).removeClass('active');
		}		
	}