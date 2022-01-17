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
		}else{
			$(pressed).data('active','false').css('background-color','red');
		}
	}