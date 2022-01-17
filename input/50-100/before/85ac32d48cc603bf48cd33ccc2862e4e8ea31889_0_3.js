function(){
			if(state[0]){
				$('#console_I').css('opacity',0.4);
				state[0] = false;
			}else{
				$('#console_I').css('opacity',1);
				state[0] = true;
			}
			refreshLogger(0);
		}