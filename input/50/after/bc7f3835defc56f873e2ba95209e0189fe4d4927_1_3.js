function play(){
		  console.log ("PLAY");
			playFrom();
			
			if(!isanimating || ispaused){
				for(var i in tweens){

					tweens[i].start();	
						
				}
				isanimating = true;
			}		
		}