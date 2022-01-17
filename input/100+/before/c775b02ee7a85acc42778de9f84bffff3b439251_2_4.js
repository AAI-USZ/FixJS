function (buttonA, buttonB, buttonC, buttonD, controllerId) {
		    var participant = _highlightedControllersToParticipants[controllerId];
		   
		    if (typeof participant === "undefined") {
		        return;
		    }
		   
		    if (typeof _assignedParticipantsToControllers[controllerId] !== "undefined") {
				return;
			}

			_assignedParticipantsToControllers[participant] = controllerId;

            var p = participants[participant];

            controllers.mapController(p.gameController.gamepadPressed, p.gameController.gamepadReleased, p.gameController.buttonsPressed, p.gameController.buttonsReleased, p.gameController.joystick, controllerId); 
                      
			if (Object.keys(_assignedParticipantsToControllers).length === participants.length)
			{
			    if (typeof gameControllersAssigned === "undefined") {
    			    return;
    		    }

                $("#assignGameControllersOverlay").remove();
                
    		    gameControllersAssigned();

			}
            

            		    
		}