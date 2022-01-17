function(){
			if(actionTaken){
				actionTaken = false;
			}else{
				$(lId).animate({
					height: 0
				});
			}
		}