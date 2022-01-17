function(){
			if(actionTaken){
				actionTaken = false;
			}else{
				$(dId).animate({
					height: 0
				});
			}
		}