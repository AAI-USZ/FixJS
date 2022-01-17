function(){
        if (gamedata.waiting == false){
            return;
			
			ajaxInterface.poll = null;
			ajaxInterface.pollcount  = 0;
		}          
        if (!gamedata.animating){
            //console.log("polling for gamedata...");
            animation.animateWaiting();
        
            if (!ajaxInterface.submiting)
                ajaxInterface.requestGamedata();
			
        }
        
        ajaxInterface.pollcount++;
        
        var time = 6000;
        
        
        if (ajaxInterface.pollcount > 10){
            time = 6000;
        }
        
        
        if (ajaxInterface.pollcount > 100){
            time = 30000;
        }
        
        if (ajaxInterface.pollcount > 200){
            time = 300000;
        }
        
        if (ajaxInterface.pollcount > 300){
            return;
        }   
       
		ajaxInterface.poll = setTimeout(ajaxInterface.pollGamedata, time);
    }