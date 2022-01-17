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
        	if(sameShakeCount > 10 && gameOn == true){

        		// Get the image element and recenter it
        		var theMsgY = document.getElementById("message");
        		theMsgY.setAttribute("style", "margin-top:-90px;");

				//Get a random number to determine which message to display
				var random = getRandomInt(0, 4);
				console.log(random);
				
				// Display the maybe message if # is 0 or 4
				var maybe = false;
				if(random == 4 || random == 0){
				
					var maybe = true;
					
        			// Pick the message based on the random number
        			switch(random){
						case 0:
						  console.log('maybe');
						  theMsgY.setAttribute("class", "msg1m");
						  break;
						case 4:
						  console.log('maybe');
						  theMsgY.setAttribute("class", "msg2m");
						  break;
						default:
						  console.log('maybe');
						  theMsgY.setAttribute("class", "msg2m");
						  break;
					}
				}

				
        		// If they shook more than the default, the answer is yes
        		if(numberOfShakes > loadedDefault && maybe != true){
        			console.log('yes!');
			
        			// Pick the message based on the random number
        			switch(random){
						case 1:
						  console.log('yeah totally');
						  theMsgY.setAttribute("class", "msg1y");
						  break;
						case 2:
						  console.log('thats correct');
						  theMsgY.setAttribute("class", "msg2y");
						  break;
						case 3:
						  console.log('fosho!');
						  theMsgY.setAttribute("class", "msg3y");
						  break;
						default:
						  console.log('fosho!');
						  theMsgY.setAttribute("class", "msg3y");
						  break;
					}				
        			 
        		// If they shook less than the default, the answer is no
        		// Dont set it to anything when the app first loads (>3)        		
        		}else if(numberOfShakes > 3 && numberOfShakes < loadedDefault && maybe != true){
        			console.log('no...');
        			var maybe = false;
        		
        			// Pick the message based on the random number
        			switch(random){
						case 1:
						  console.log('no way');
						  theMsgY.setAttribute("class", "msg1n");
						  break;
						case 2:
						  console.log('I think not');
						  theMsgY.setAttribute("class", "msg2n");
						  break;
						case 3:
						  console.log('not a chance');
						  theMsgY.setAttribute("class", "msg3n");
						  break;
						default:
						  console.log('not a chance');
						  theMsgY.setAttribute("class", "msg3n");
						  break;
					}
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