function countShakes(shake){
		
		// Count up the shakes if its different from the last shake
		// If the shake changed, reset the same shake counter
        if(shake != lastShake){
        	numberOfShakes++;
        	sameShakeCount = 0;
        }else{
        	
        	// Count how many times a shake did _not_ happen
        	sameShakeCount++;
        	
        	// If they do not shake for 1 second, they are done shaking
        	if(sameShakeCount > 10){

        		// If they shook more than the default, the answer is yes
        		if(numberOfShakes > loadedDefault){
        			console.log('yes!');
        			        			
        			var theMsgY = document.getElementById("message");
					theMsgY.setAttribute("class", "msg1y");
					theMsgY.setAttribute("style", "margin-top:-90px;");
        			 
        		// If they shook less than the default, the answer is no
        		// Dont set it to anything when the app first loads (>3)        		
        		}else if(numberOfShakes > 3 && numberOfShakes < loadedDefault){
        			console.log('no...');
        			
        			var theMsgN = document.getElementById("message");
					theMsgN.setAttribute("class", "msg1n");
					theMsgN.setAttribute("style", "margin-top:-90px;");
        		}
        		
        		// Reset for a fresh shake
        		gameOn = false;
        		numberOfShakes = 0;
        		
        	}
        	//console.log(sameShakeCount);
        }
        
        // Remember the last shake for next time
        lastShake = shake;
        
        // Debug code to show the # of shakes
        //var shakes = document.getElementById('shakes');
        //shakes.innerHTML = numberOfShakes;
	}