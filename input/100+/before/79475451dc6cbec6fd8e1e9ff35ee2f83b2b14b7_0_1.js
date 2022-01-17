function(eventData){
		var pressed = eventData.srcElement;
		if($(pressed).data('active')!='true'){
			$(pressed).data('active','true').css('background-color','green');
			if (pressed.id == "ppaj"){
				autoJoin();
			}
			if (pressed.id == "ppaw"){
				autoWoot();
			}
			setCookie(pressed.id,'true',7);
		}else{
			$(pressed).data('active','false').css('background-color','red');
			setCookie(pressed.id,'false',7);
		}
	}