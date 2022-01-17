function(){
			if(state[1]){
				$('#console_W').css('opacity',0.4);
				state[1] = false;
			}else{
				$('#console_W').css('opacity',1);
				state[1] = true;
			}
			refreshLogger(1);
		}